// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import fs from 'fs';
import path from 'path';
import { Application } from '@dolittle/vanir-common';
import { exec } from 'child_process';
import { RunningInstanceType } from '../../common/applications/IApplications';
import { MicroserviceWithLocationAndPorts } from './MicroserviceWithLocationAndPorts';
import { RunningProcess } from './RunningProcess';
import { ILogger } from '@dolittle/vanir-backend';

/* eslint-disable object-shorthand */
/* eslint-disable quote-props */

export class Processes {
    readonly _running: RunningProcess[] = [];

    constructor(private _directory: string, private _application: Application, private _logger: ILogger) {
    }

    start(instance: RunningInstanceType, microservice: MicroserviceWithLocationAndPorts): RunningProcess {
        const instanceName = Object.values(RunningInstanceType)[instance].toString();
        const processDirectory = path.join(microservice.location, instanceName);
        if (!fs.existsSync(processDirectory)) {
            throw new Error(`Directory '${processDirectory}' does not exist trying to start instance '${instanceName}' on '${this._application.name}'`);
        }

        let port = 0;
        switch (instance) {
            case RunningInstanceType.Backend: {
                port = microservice.ports.backend;
            } break;
            case RunningInstanceType.Web: {
                port = microservice.ports.web;
            } break;
        }

        const command = 'yarn start:dev';


        const env: any = {
            'port': port.toString(),
            'dolittle_runtime_port': (microservice.ports.runtime + 1).toString()
        };

        this._logger.info(`Starting '${command}' in '${processDirectory}'`, env);

        const childProcess = exec(command, {
            cwd: processDirectory,
            env: { ...process.env, ...env }
        });
        childProcess.stdout?.setEncoding('utf8');
        childProcess.stderr?.setEncoding('utf8');

        const runningProcess = new RunningProcess(instance, microservice, childProcess);
        this._running.push(runningProcess);
        return runningProcess;
    }

    stop() {
        this._logger.info(`Stopping processes for application '${this._application.name}'`);
        let count = 0;
        for (const process of this._running) {
            process.stop();
            count++;
        }
        this._logger.info(`Processes are stopped (${count} total)`);
    }

    getFor(instance: RunningInstanceType, microservice: MicroserviceWithLocationAndPorts): RunningProcess {
        const runningProcess = this._running.find(_ => _.instance === instance && _.microservice.id === microservice.id);
        if (!runningProcess) {
            const instanceName = Object.values(RunningInstanceType)[instance].toString();
            throw new Error(`Couldn't get running process for '${instanceName}' for microservice '${microservice.name}' in application '${this._application.name}'`);
        }
        return runningProcess;
    }
}
