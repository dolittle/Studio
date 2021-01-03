// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application } from '@dolittle/vanir-common';
import { injectable, inject } from 'tsyringe';
import { IApplications, IApplicationsToken } from '../../../common/applications/IApplications';
import { Globals } from '../../Globals';
import { ApplicationState, InstanceState, RunState } from '../../../common/applications';

/* eslint-disable no-restricted-globals */
@injectable()
export class OverviewViewModel {
    application!: Application;
    instances: InstanceState[] = [];
    state: ApplicationState = { id: '', state: RunState.unknown };

    constructor(@inject(IApplicationsToken) private readonly _applications: IApplications, private readonly _globals: Globals) {
    }

    setApplication(application: Application) {
        if (this.application?.id !== application.id) {
            this.application = application;
        }

        this._globals.applicationStateFor(application).subscribe(_ => this.state = _);
        this._globals.instanceStateFor(application).subscribe(_ => this.instances = _);
    }
}
