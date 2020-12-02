// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import gql from 'graphql-tag';
import { injectable } from 'tsyringe';
import { DataSource } from './DataSource';
import { MicroserviceModel } from './MicroserviceModel';

@injectable()
export class OverviewViewModel {
    items: MicroserviceModel[] = [];

    constructor(readonly _dataSource: DataSource) {}

    activate() {
        this._startPollingForApplications();
    }

    private _startPollingForApplications() {
        const query = gql`
            query {
                allMicroservices {
                    id
                    name
                }
            }
        `;

        const observableQuery = this._dataSource.watchQuery<any>({ query });

        observableQuery.startPolling(1000);
        observableQuery.subscribe((next) => {
            if (next.data) {
                this.items = next.data.allMicroservices;
            }
        });
    }
}
