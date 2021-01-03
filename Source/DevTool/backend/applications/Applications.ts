// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import Docker, { ContainerInfo } from 'dockerode';

import fs from 'fs';
import path from 'path';
import { ApplicationRunState, ApplicationStatus, IApplications, RunningInstanceType, RunState, ICurrentStateToken, ICurrentState } from '../../common/applications';
import { injectable, inject } from 'tsyringe';
import { Application, Microservice } from '@dolittle/vanir-common';

import { exec } from 'child_process';
import { ILogger } from '@dolittle/vanir-backend';
import { RunningApplication } from './RunningApplication';
import { getMainWindow } from '../globals';

import byline from 'byline';
import { Guid } from '@dolittle/rudiments';
import { MicroserviceWithLocationAndPorts } from './MicroserviceWithLocationAndPorts';
import { CapturedLog } from './CapturedLog';
import { Containers } from './Containers';
import { Processes } from './Processes';
import { IWorkspaces, IWorkspacesToken } from '../../common/workspaces';
import { MicroservicePorts } from '../../common/workspaces/MicroservicePorts';

import { waitForMongo } from './waitForMongo';
import { IRunningInstance } from '../../build/backend/applications/IRunningInstance';

/* eslint-disable no-restricted-globals */

@injectable()
export class Applications implements IApplications {
    private _runningApplications: RunningApplication[] = [];
    private _capturedLogs: { [key: string]: CapturedLog } = {};

    constructor(
        @inject(IWorkspacesToken) private readonly _workspaces: IWorkspaces,
        @inject(ICurrentStateToken) private readonly _currentState: ICurrentState,
        private readonly _docker: Docker,
        private readonly _logger: ILogger) {
    }

    async start(directory: string, application: Application) {
        const workingDirectory = path.join(directory, '.dolittle');

        this._logger.info(`Starting application '${application.name}' from ${workingDirectory}`);
        const microservices = await this.getMicroservicesFor(directory, application);

        this._currentState.reportRunStateForApplication(application.id, RunState.starting);
        this._currentState.reportTask(application.id, 'Starting docker containers');
        exec('docker-compose up -d', { cwd: workingDirectory }, (err, stdout, stderr) => {
            if (err) {
                console.error(`Exec error ${err}`);
                return;
            }

            const interval = setInterval(async () => {
                const containerInfos = await this.listContainersForApplication(application.id);
                if (containerInfos.length === application.microservices.length + 2) {
                    clearInterval(interval);

                    this._logger.info('Containers are ready');

                    const containers = new Containers(application, containerInfos);
                    const processes = new Processes(directory, application, this._logger);

                    const runningApplication = new RunningApplication(
                        this._docker,
                        directory,
                        application,
                        microservices,
                        containers,
                        processes,
                        this._logger);
                    this._runningApplications.push(runningApplication);

                    this.registerInstance(application.id, runningApplication.ingress);
                    this.registerInstance(application.id, runningApplication.mongo);
                    this._currentState.reportRunStateForInstance(application.id, runningApplication.ingress.id, RunState.running);
                    this._currentState.reportRunStateForInstance(application.id, runningApplication.mongo.id, RunState.starting);

                    this._currentState.reportTask(application.id, 'Wait for mongo to become ready');
                    await waitForMongo(this._logger);

                    this._currentState.reportRunStateForInstance(application.id, runningApplication.mongo.id, RunState.running);

                    this._currentState.reportTask(application.id, 'Start processes');
                    for (const microservice of microservices) {
                        this._currentState.reportRunStateForMicroservice(application.id, microservice.id, RunState.starting);
                        processes.start(RunningInstanceType.Backend, microservice);
                        processes.start(RunningInstanceType.Web, microservice);

                        const runningMicroservice = runningApplication.addMicroservice(microservice);
                        this.registerInstance(application.id, runningMicroservice.runtime);
                        this._currentState.reportRunStateForInstance(application.id, runningMicroservice.runtime.id, RunState.running);
                        this.registerInstance(application.id, runningMicroservice.backend);
                        this._currentState.reportRunStateForInstance(application.id, runningMicroservice.backend.id, RunState.running);
                        this.registerInstance(application.id, runningMicroservice.web);
                        this._currentState.reportRunStateForInstance(application.id, runningMicroservice.web.id, RunState.running);
                        this._currentState.reportRunStateForMicroservice(application.id, microservice.id, RunState.running);
                    }

                    this._currentState.reportRunStateForApplication(application.id, RunState.running);
                }
            }, 500);

        });
    }

    private registerInstance(applicationId: string, instance: IRunningInstance) {
        this._currentState.registerInstance(applicationId, instance.id, instance.name, instance.type);
    }

    async stop(directory: string, application: Application) {
        const workingDirectory = path.join(directory, '.dolittle');

        this._logger.info(`Stopping application '${application.name}' from ${workingDirectory}`);
        this._currentState.reportRunStateForApplication(application.id, RunState.stopping);

        this._currentState.reportTask(application.id, 'Stopping processes');
        const runningApplication = this._runningApplications.find(_ => _.application.id === application.id);
        if (runningApplication) {
            runningApplication.processes.stop();
        }

        this._currentState.reportTask(application.id, 'Stopping docker containers');

        exec('docker-compose down --remove-orphans', { cwd: workingDirectory }, (err, stdout, stderr) => {
            if (err) {
                console.error(`Exec error ${err}`);
                return;
            }

            const interval = setInterval(async () => {
                const containers = await this.listContainersForApplication(application.id);
                if (containers.length === 0) {
                    clearInterval(interval);
                    this._logger.info('Containers are stopped');
                    this._runningApplications = this._runningApplications.filter(_ => _.application.id !== application.id);
                    this._currentState.removeAllInstancesFrom(application.id);
                    this._currentState.reportRunStateForApplication(application.id, RunState.stopped);
                }
            }, 500);
        });
    }

    async getStatusFor(id: string): Promise<ApplicationStatus> {
        const containers = await this.listContainersForApplication(id);

        return {
            runState: ApplicationRunState.stopped,
            containers
        };
    }

    async startCaptureLogFor(application: Application, instance: RunningInstanceType, microservice?: Microservice): Promise<string> {
        const mainWindow = getMainWindow();
        const id = Guid.create().toString();

        this._logger.info(`Start log capture for ${application.name} - ${Object.values(RunningInstanceType)[instance]}`);

        const runningApplication = this._runningApplications.find(_ => _.application.id === application.id);
        if (runningApplication) {
            this._logger.info('Found running application');
            const runningInstance = runningApplication.getRunningInstanceFor(instance, microservice);

            if (runningInstance) {
                const logs = await runningInstance.getLogs();
                const stream = byline.createStream(logs);
                stream.on('data', (data: Buffer) => {
                    const message = data.slice(8);  // Skip Docker header
                    mainWindow?.webContents.send(id, message);
                });

                this._capturedLogs[id] = {
                    id,
                    logs,
                    byline: stream
                };
                this._logger.info(`Started capture with id '${id}'`);
            }
        }

        return id;
    }

    async stopCaptureLogFor(id: string): Promise<void> {
        if (this._capturedLogs[id]) {
            this._capturedLogs[id].byline.removeAllListeners();
            this._capturedLogs[id].logs.removeAllListeners();
            delete this._capturedLogs[id];
            this._logger.info(`Stopped log capture for '${id}'`);
        }
    }

    private async getMicroservicesFor(directory: string, application: Application): Promise<MicroserviceWithLocationAndPorts[]> {
        const workspace = this._workspaces.getFor(application);
        const microservices: MicroserviceWithLocationAndPorts[] = [];
        for (const relativePath of application.microservices) {
            const microserviceDirectory = path.join(directory, relativePath);
            const microservicePath = path.join(microserviceDirectory, 'microservice.json');
            if (fs.existsSync(microservicePath)) {
                this._logger.info(`Adding microservice`);
                const buffer = await fs.promises.readFile(microservicePath);
                const microservice = JSON.parse(buffer.toString()) as MicroserviceWithLocationAndPorts;
                microservice.location = microserviceDirectory;
                microservice.ports = (await workspace).microservicePorts.find(_ => _.id === microservice.id) || MicroservicePorts.default;
                microservices.push(microservice);
            }
        }

        return microservices;
    }

    private async listContainersForApplication(id: string): Promise<ContainerInfo[]> {
        const containers = await this._docker.listContainers({
            filters: {
                label: [`dolittle=\"${id}\"`]
            }
        });
        return containers;
    }
}
