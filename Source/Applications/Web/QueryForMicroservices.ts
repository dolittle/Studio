// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import gql from 'graphql-tag';
import { injectable } from 'tsyringe';
import { DataSource } from '@shared/web';

@injectable()
export class QueryForMicroservices {
    constructor(readonly _dataSource: DataSource) {}

    async allMicroservices(): Promise<MicroserviceModel[]> {
        // const query = gql`
        //     query {
        //         allMicroservices {
        //             id
        //             name
        //         }
        //     }
        // `;

        // const result = await this._dataSource.query<MicroservicesQuery>({ query });

        // return result.data?.allMicroservices ?? [];
        return [];
    }
}
export type MicroservicesQuery = {
    allMicroservices: MicroserviceModel[];
};

export type MicroserviceModel = {
    id: string;
    name: string;
};
