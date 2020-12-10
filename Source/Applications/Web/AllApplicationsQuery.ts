// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { BehaviorSubject } from 'rxjs';
import { ObservableQuery, NetworkStatus } from 'apollo-client';
import gql from 'graphql-tag';
import { injectable, singleton } from 'tsyringe';
import { ApplicationModel } from './ApplicationModel';
import { DataSource } from '@shared/web';

@singleton()
@injectable()
export class AllApplicationsQuery {
    items: BehaviorSubject<ApplicationModel[]> = new BehaviorSubject<ApplicationModel[]>(
        []
    );
    private _observableQuery?: ObservableQuery<any>;

    constructor(readonly _dataSource: DataSource) {
        this.startPollingForApplications();
    }

    public startPollingForApplications() {
        this._startPollingForApplications();
    }

    public stopPollingForApplications() {
        if(this._observableQuery) {
            this._observableQuery.stopPolling();
        }
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

        this._observableQuery = this._dataSource.watchQuery<any>({ query });

        this._observableQuery.startPolling(5000);
        this._observableQuery.subscribe((next) => {
            if(next.networkStatus === NetworkStatus.ready && next.data){
                // Should we have some logic to decide if there are actually any changes?
                this.items.next(next.data.allApplications);
            }
        });
    }
}
