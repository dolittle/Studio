// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ApplicationStatus } from '../../common/applications/ApplicationStatus';
import { IApplications, IApplicationsToken, RunningInstanceType } from '../../common/applications/IApplications';
import { injectable } from 'tsyringe';
import { Interop } from '../Interop';
import { Application, Microservice } from '@dolittle/vanir-common';

@injectable()
export class ApplicationsProxy implements IApplications {
    constructor(private readonly _interop: Interop) {
    }

    async start(path: string, application: Application): Promise<void> {
        return this._interop.invoke(IApplicationsToken, 'start', path, application);
    }

    async stop(path: string, application: Application): Promise<void> {
        return this._interop.invoke(IApplicationsToken, 'stop', path, application);
    }

    async getStatusFor(id: string): Promise<ApplicationStatus> {
        return await this._interop.invoke(IApplicationsToken, 'getStatusFor', id) as ApplicationStatus;
    }

    startCaptureLogFor(application: Application, instance: RunningInstanceType, microservice?: Microservice): Promise<string> {
        return this._interop.invoke(IApplicationsToken, 'startCaptureLogFor', application, instance, microservice);
    }

    stopCaptureLogFor(id: string): Promise<void> {
        return this._interop.invoke(IApplicationsToken, 'stopCaptureLogFor', id);
    }
}
