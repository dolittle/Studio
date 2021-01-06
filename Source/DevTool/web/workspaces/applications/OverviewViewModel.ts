// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Subscription } from 'rxjs';
import { Application } from '@dolittle/vanir-common';
import { injectable, inject } from 'tsyringe';
import { IApplications, IApplicationsToken } from '../../../common/applications/IApplications';
import { Globals } from '../../Globals';
import { ApplicationState, InstanceState, RunState } from '../../../common/applications';
import { OverviewProps } from './OverviewProps';

/* eslint-disable no-restricted-globals */
@injectable()
export class OverviewViewModel {
    private _application!: Application;
    instances: InstanceState[] = [];
    state: ApplicationState = { id: '', state: RunState.unknown };

    private _applicationStateSubscription?: Subscription;
    private _instanceStateSubscription?: Subscription;

    constructor(@inject(IApplicationsToken) private readonly _applications: IApplications, private readonly _globals: Globals) {
    }

    propsChanged(props: OverviewProps) {
        if (this._application?.id !== props.application.id) {
            this._application = props.application;
        }

        this.cleanupSubscriptions();
        this._applicationStateSubscription = this._globals.applicationStateFor(props.application).subscribe(_ => this.state = _);
        this._instanceStateSubscription = this._globals.instanceStateFor(props.application).subscribe(_ => this.instances = _);
    }

    detached() {
        this.cleanupSubscriptions();
    }

    private cleanupSubscriptions() {
        if (this._applicationStateSubscription) {
            this._applicationStateSubscription.unsubscribe();
        }

        if (this._instanceStateSubscription) {
            this._instanceStateSubscription.unsubscribe();
        }
    }
}
