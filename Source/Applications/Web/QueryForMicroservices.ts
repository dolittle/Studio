// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import gql from 'graphql-tag';
import { injectable } from 'tsyringe';
import { DataSource } from './DataSource';
import { MicroserviceModel } from './MicroserviceModel';

@injectable()
export class QueryForMicroservices {
    constructor(readonly _dataSource: DataSource) {}

    async allMicroservices(): Promise<MicroserviceModel[]> {
        const query = gql`
            query {
                allMicroservices {
                    microserviceId
                    name
                }
            }
        `;

        const result = await this._dataSource.query<MicroservicesQuery>({ query });

        return result.data?.allMicroservices ?? [];
    }
}
export type MicroservicesQuery = {
    allMicroservices: MicroserviceModel[];
};


