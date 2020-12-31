// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application } from '@dolittle/vanir-common';
import { injectable, inject } from 'tsyringe';
import { ApplicationStatus } from '../../common/applications/ApplicationStatus';
import { IApplicationsToken } from '../../common/applications/IApplications';
import { Applications } from '../Applications';
import { ContainerInfo } from 'dockerode';

@injectable()
export class OverviewViewModel {
    application: Application;
    applicationStatus: ApplicationStatus;
    containers: ContainerInfo[] = [];

    constructor(applications: Applications,
        @inject(IApplicationsToken) private readonly _applications: IApplications) {
        applications.current.subscribe(_ => {
            this.application = _;
            this.updateStatus();
        });
    }


    activate() {
        console.log('activate');
        this.updateStatus();
    }

    async updateStatus() {
        if (this.application) {
            this.applicationStatus = await this._applications.getStatusFor(this.application.id);
            this.containers = this.applicationStatus.containers;
        }
    }
}