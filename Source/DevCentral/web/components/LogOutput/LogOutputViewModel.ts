// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application, Microservice } from '@dolittle/vanir-common';
import { Terminal } from 'xterm';
import { injectable, inject } from 'tsyringe';
import { IApplications, IApplicationsToken, RunningInstanceType } from '../../../common/applications/IApplications';
import { Globals } from '../../Globals';
const ipcRenderer = window.require('electron').ipcRenderer;

@injectable()
export class LogOutputViewModel {
    private _captureId?: string;

    application!: Application;
    microservice?: Microservice;

    constructor(
        @inject(IApplicationsToken) private readonly _applications: IApplications,
        globals: Globals) {
        globals.application.subscribe(_ => this.application = _);
        globals.microservice.subscribe(_ => this.microservice = _);
    }

    async startCapture(terminal: Terminal, instance: RunningInstanceType) {
        terminal.clear();
        this._captureId = await this._applications.startCaptureLogFor(this.application, instance, this.microservice);
        ipcRenderer.on(this._captureId, (event, message) => {
            terminal.writeln(message);
        });
    }

    stopCapture() {
        if (this._captureId) {
            this._applications.stopCaptureLogFor(this._captureId);
        }
    }
}
