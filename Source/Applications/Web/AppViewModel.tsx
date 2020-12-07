// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Guid } from '@dolittle/rudiments';
import gql from 'graphql-tag';
import { DataSource } from './DataSource';
import { ObservableQuery, NetworkStatus } from 'apollo-client';
import { ApplicationModel } from './ApplicationModel';

@injectable()
export class AppViewModel {
    allApplications: ApplicationModel[] = [];
    assignMicroserviceDialogVisible: boolean = false;
    createApplicationDialogVisible: boolean = false;
    selectedApplication?: ApplicationModel;

    private _observableQuery?: ObservableQuery;

    constructor(readonly _dataSource: DataSource) {

    }

    activate() {
        this._startPollingForApplications();
    }

    setCreateApplicationDialogVisible(show: boolean) {
        this.createApplicationDialogVisible = show;
    }
    setAssignMicroserviceDialogVisible(show: boolean) {
        this.assignMicroserviceDialogVisible = show;
    }

    private async _startPollingForApplications() {
        const query = gql`
            query {
                allApplications {
                    id
                    name
                }
            }
        `;

        this._observableQuery = this._dataSource.watchQuery<AllApplicationsQuery>({ query });

        this._observableQuery.startPolling(1000);
        this._observableQuery.subscribe((next) => {
            if(next.networkStatus === NetworkStatus.ready && next.data){
                // Should we have some logic to decide if there are actually any changes?
                this.allApplications = next.data.allApplications;
                this.selectedApplication = this.allApplications?.[0];
            }
        });
    }
}

type AllApplicationsQuery = {
    allApplications: ApplicationModel[];
};

