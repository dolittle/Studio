// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application } from '@dolittle/vanir-common';
import { injectable, inject } from 'tsyringe';
import { ApplicationStatus } from '../../../common/applications/ApplicationStatus';
import { IApplications, IApplicationsToken } from '../../../common/applications/IApplications';
import { ContainerInfo } from 'dockerode';
import { Guid } from '@dolittle/rudiments';

/* eslint-disable no-restricted-globals */
@injectable()
export class OverviewViewModel {
    application!: Application;
    applicationStatus!: ApplicationStatus;
    containers: ContainerInfo[] = [];

    constructor(@inject(IApplicationsToken) private readonly _applications: IApplications) {
        setInterval(() => {
            this.updateStatus();
        }, 1000);
    }

    setApplication(application: Application) {
        if (this.application?.id !== application.id) {
            this.application = application;
        }
    }

    async updateStatus() {
        if (this.application) {
            this.applicationStatus = await this._applications.getStatusFor(this.application.id);
            this.containers = this.applicationStatus.containers;
        }
    }
}
