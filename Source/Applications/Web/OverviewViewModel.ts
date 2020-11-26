// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import gql from 'graphql-tag';
import { injectable } from 'tsyringe';
import { ApplicationModel } from './ApplicationModel';
import { DataSource } from './DataSource';

@injectable()
export class OverviewViewModel {
    items: ApplicationModel[] = [];

    constructor(readonly _dataSource: DataSource) {}

    activate() {
        this._startPollingForApplications();
    }

    private _startPollingForApplications() {
        const query = gql`
            query {
                allApplications {
                    applicationId
                    name
                }
            }
        `;

        const observableQuery = this._dataSource.watchQuery<any>({ query });

        observableQuery.startPolling(1000);
        observableQuery.subscribe((next) => {
            if (next.data) {
                this.items = next.data.allApplications;
            }
        });
    }
}
