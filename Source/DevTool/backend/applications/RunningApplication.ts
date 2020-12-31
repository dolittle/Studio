// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import fs from 'fs';
import path from 'path';
import Docker, { ContainerInfo } from 'dockerode';
import { Application, Microservice } from '@dolittle/vanir-common';
import { RunningMicroservice } from './RunningMicroservice';
import { IRunningInstance } from './IRunningInstance';
import { findInContainers } from './findInContainers';
import { RunningTypescriptBackend } from './RunningTypescriptBackend';
import { RunningWebFrontend } from './RunningWebFrontend';
import { ILogger } from '@dolittle/vanir-backend';
import { RunningContainer } from './RunningContainer';

export class RunningApplication {
    readonly mongo: IRunningInstance;
    readonly ingress: IRunningInstance;
    readonly microservices: RunningMicroservice[] = [];

    constructor(
        readonly docker: Docker,
        readonly directory: string,
        readonly application: Application,
        readonly startupStdout: string,
        readonly startupStderr: string,
        containers: ContainerInfo[],
        private readonly _logger: ILogger) {

        this._logger.info('Setting up RunningApplication');

        this.mongo = new RunningContainer(docker, findInContainers(containers, application, 'mongo'));
        this.ingress = new RunningContainer(docker, findInContainers(containers, application, 'ingress'));

        for (const relativePath of application.microservices) {
            const runtime = new RunningContainer(docker, findInContainers(containers, application, 'runtime'));

            const microservicePath = path.join(directory, relativePath, 'microservice.json');
            if (fs.existsSync(microservicePath)) {
                this._logger.info(`Adding microservice`);
                const buffer = fs.readFileSync(microservicePath);
                const microservice = JSON.parse(buffer.toString()) as Microservice;
                const backend = new RunningTypescriptBackend(application, microservice);
                const web = new RunningWebFrontend(application, microservice);
                const runningMicroservice = new RunningMicroservice(microservice, runtime, backend, web);
                this.microservices.push(runningMicroservice);
            }
        }
    }
}
