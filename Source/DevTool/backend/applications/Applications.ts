// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import Docker, { ContainerInfo } from 'dockerode';

import path from 'path';
import { ApplicationRunState, ApplicationStatus, IApplications, RunningInstanceType } from '../../common/applications';
import { injectable } from 'tsyringe';
import { Application, Microservice } from '@dolittle/vanir-common';

import { exec } from 'child_process';
import { ILogger } from '@dolittle/vanir-backend';
import { RunningApplication } from './RunningApplication';
import { IRunningInstance } from './IRunningInstance';
import { getMainWindow } from '../globals';

import byline from 'byline';

/* eslint-disable no-restricted-globals */
@injectable()
export class Applications implements IApplications {
    private _runningApplications: RunningApplication[] = [];

    constructor(private readonly _docker: Docker, private readonly _logger: ILogger) {
    }

    async start(directory: string, application: Application) {
        const workingDirectory = path.join(directory, '.dolittle');

        this._logger.info(`Starting application '${application.name}' from ${workingDirectory}`);

        exec('docker-compose up -d', { cwd: workingDirectory }, (err, stdout, stderr) => {
            if (err) {
                console.error(`Exec error ${err}`);
                return;
            }

            const interval = setInterval(async () => {
                const containers = await this.listContainersForApplication(application.id);
                if (containers.length === application.microservices.length + 2) {
                    this._logger.info('Containers are ready');
                    const runningApplication = new RunningApplication(this._docker, directory, application, stdout, stderr, containers, this._logger);
                    this._runningApplications.push(runningApplication);
                    clearInterval(interval);
                }
            }, 500);

        });
    }

    async stop(directory: string, application: Application) {
        const workingDirectory = path.join(directory, '.dolittle');

        this._logger.info(`Stopping application '${application.name}' from ${workingDirectory}`);

        exec('docker-compose down --remove-orphans', { cwd: workingDirectory }, (err, stdout, stderr) => {
            if (err) {
                console.error(`Exec error ${err}`);
                return;
            }

            const interval = setInterval(async () => {
                const containers = await this.listContainersForApplication(application.id);
                if (containers.length === 0) {
                    this._logger.info('Containers are stopped');
                    this._runningApplications = this._runningApplications.filter(_ => _.application.id !== application.id);
                    clearInterval(interval);
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

    async captureLogFor(application: Application, instance: RunningInstanceType, microservice?: Microservice): Promise<void> {
        const mainWindow = getMainWindow();

        const runningApplication = this._runningApplications.find(_ => _.application.id === application.id);
        if (runningApplication) {
            let runningInstance: IRunningInstance | undefined;
            if (microservice) {
                const runningMicroservice = runningApplication.microservices.find(_ => _.microservice.id === microservice.id);
                if (runningMicroservice) {
                    switch (instance) {
                        case RunningInstanceType.Runtime: {
                            runningInstance = runningMicroservice.runtime;
                        } break;
                        case RunningInstanceType.Backend: {
                            runningInstance = runningMicroservice.backend;
                        } break;
                        case RunningInstanceType.Web: {
                            runningInstance = runningMicroservice.web;
                        } break;
                    }
                }
            } else {
                switch (instance) {
                    case RunningInstanceType.Ingress: {
                        runningInstance = runningApplication.ingress;
                    } break;
                    case RunningInstanceType.Mongo: {
                        runningInstance = runningApplication.mongo;
                    } break;
                }
            }

            if (runningInstance) {
                const logs = await runningInstance.getLogs();
                const stream = byline.createStream(logs);
                stream.on('data', (data: Buffer) => {
                    const message = data.slice(8);  // Skip Docker header
                    mainWindow?.webContents.send('log-message', message);
                });
            }
        }
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
