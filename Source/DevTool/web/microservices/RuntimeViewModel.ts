// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Terminal } from 'xterm';
import { injectable, inject } from 'tsyringe';
import { IApplicationsToken, IApplications, RunningInstanceType } from '../../common/applications/IApplications';
import { Applications } from '../Applications';
import { Microservices } from '../Microservices';
import { Application, Microservice } from '@dolittle/vanir-common';
const ipcRenderer = window.require('electron').ipcRenderer;

@injectable()
export class RuntimeViewModel {
    application!: Application;
    microservice!: Microservice;

    constructor(
        @inject(IApplicationsToken) private readonly _applications: IApplications,
        applications: Applications,
        microservices: Microservices) {
        applications.current.subscribe(_ => this.application = _);
        microservices.current.subscribe(_ => this.microservice = _);
    }

    terminalReady(terminal: Terminal) {
        terminal.clear();
        ipcRenderer.on('log-message', (event, message) => {
            terminal.writeln(message);
        });

        this._applications.captureLogFor(this.application, RunningInstanceType.Runtime, this.microservice);
    }
}
