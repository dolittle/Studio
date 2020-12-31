// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import Docker from 'dockerode';

import path from 'path';
import { ApplicationRunState, ApplicationStatus, IApplications } from '../../common/applications';
import { injectable } from 'tsyringe';
import { Application } from '@dolittle/vanir-common';

import { exec } from 'child_process';
import { ILogger } from '@dolittle/vanir-backend';

@injectable()
export class Applications implements IApplications {

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

            console.log(stdout);
            console.log(stderr);
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

            console.log(stdout);
            console.log(stderr);
        });
    }

    async getStatusFor(id: string): Promise<ApplicationStatus> {
        const containers = await this._docker.listContainers({
            filters: {
                label: [`dolittle=\"${id}\"`]
            }
        });

        return {
            runState: ApplicationRunState.stopped,
            containers
        };
    }
}