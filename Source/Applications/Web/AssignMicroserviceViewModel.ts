// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import gql from 'graphql-tag';
import { injectable } from 'tsyringe';
import { DataSource } from './DataSource';

@injectable()
export class AssignMicroserviceViewModel {
    applicationName?: string = '';
    microservices: {key: string, text: string}[] = [];

    constructor(
        readonly _dataSource: DataSource
    ) {}

    activate() {
        this._fetchMicroservices();
    }

    async _fetchMicroservices(): Promise<void> {
        const query = gql`
            query {
                allMicroservices {
                    microserviceId
                    name
                }
            }
        `;

        const result = await this._dataSource.query<MicroservicesQuery>({ query });

        this.microservices = result
            .data
            ?.allMicroservices
            .map(ms => ({key: ms.microserviceId, text: ms.name}));
    }

    async assignMicroservice() {
        // //Validation?
        // if (this.applicationName) {
        //     await this.applications.create({ name: this.applicationName });
        //     this._props?.onCreated();
        // }
    }

}

export type MicroservicesQuery = {
    allMicroservices: MicroserviceModel[]
};

export type MicroserviceModel = {
    microserviceId: string,
    name: string
}
