// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application } from '@dolittle/vanir-common';
import { injectable, inject } from 'tsyringe';
import { Applications } from '../Applications';
import { IApplications, IApplicationsToken } from '../../common/applications/IApplications';
import { ApplicationStatus } from '../../common/applications/ApplicationStatus';

@injectable()
export class ApplicationViewModel {
    application: Application;
    applicationStatus: ApplicationStatus;

    constructor(applications: Applications,
        @inject(IApplicationsToken) private readonly _applications: IApplications) {
        applications.current.subscribe(_ => {
            this.application = _;
            this.updateStatus();
        });
    }

    async updateStatus() {
        this.applicationStatus = await this._applications.getStatusFor(this.application.id);
    }
}