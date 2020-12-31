// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import Docker, { ContainerInfo } from 'dockerode';

import path from 'path';
import { ApplicationRunState, ApplicationStatus, IApplications } from '../../common/applications';
import { injectable } from 'tsyringe';
import { Application } from '@dolittle/vanir-common';

import { exec } from 'child_process';
import { ILogger } from '@dolittle/vanir-backend';
import { RunningApplication } from './RunningApplication';

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

    private async listContainersForApplication(id: string): Promise<ContainerInfo[]> {
        const containers = await this._docker.listContainers({
            filters: {
                label: [`dolittle=\"${id}\"`]
            }
        });
        return containers;
    }
}
