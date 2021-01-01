// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import Docker, { ContainerInfo } from 'dockerode';
import { Application, Microservice } from '@dolittle/vanir-common';
import { RunningMicroservice } from './RunningMicroservice';
import { IRunningInstance } from './IRunningInstance';
import { RunningTypescriptBackend } from './RunningTypescriptBackend';
import { RunningWebFrontend } from './RunningWebFrontend';
import { ILogger } from '@dolittle/vanir-backend';
import { RunningContainer } from './RunningContainer';
import { MicroserviceWithLocationAndPorts } from './MicroserviceWithLocationAndPorts';
import { RunningInstanceType } from '../../common/applications/IApplications';
import { Containers } from './Containers';
import { Processes } from './Processes';

export class RunningApplication {
    readonly mongo: IRunningInstance;
    readonly ingress: IRunningInstance;
    readonly runningMicroservices: RunningMicroservice[] = [];

    constructor(
        readonly docker: Docker,
        readonly directory: string,
        readonly application: Application,
        readonly microservices: MicroserviceWithLocationAndPorts[],
        readonly startupStdout: string,
        readonly startupStderr: string,
        readonly containers: Containers,
        readonly processes: Processes,
        private readonly _logger: ILogger) {

        this._logger.info('Setting up RunningApplication');

        this.mongo = new RunningContainer(docker, containers.getByName('mongo'));
        this.ingress = new RunningContainer(docker, containers.getByName('ingress'));

        for (const microservice of microservices) {
            const runtime = new RunningContainer(docker, containers.getByName('runtime'));
            const backend = processes.getFor(RunningInstanceType.Backend, microservice);
            const web = processes.getFor(RunningInstanceType.Web, microservice);
            const runningMicroservice = new RunningMicroservice(microservice, runtime, backend, web);
            this.runningMicroservices.push(runningMicroservice);
        }
    }


    getRunningInstanceFor(instance: RunningInstanceType, microservice?: Microservice): IRunningInstance | undefined {
        let runningInstance: IRunningInstance | undefined;
        if (microservice) {
            const runningMicroservice = this.runningMicroservices.find(_ => _.microservice.id === microservice.id);
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
        }

        switch (instance) {
            case RunningInstanceType.Ingress: {
                runningInstance = this.ingress;
            } break;
            case RunningInstanceType.Mongo: {
                runningInstance = this.mongo;
            } break;
        }

        return runningInstance;
    }
}
