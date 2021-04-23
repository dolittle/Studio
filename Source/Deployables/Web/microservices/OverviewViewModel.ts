// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { DataSource } from '@dolittle/vanir-web';
import { RouteInfo } from '@dolittle/vanir-react';
import gql from 'graphql-tag';

export type MicroserviceType = {
    id: string;
    name: string;
};

export type AllMicroserviceTypesResult = {
    microservices: {
        allMicroserviceTypes: MicroserviceType[];
    }
};

@injectable()
export class OverviewViewModel {
    microserviceTypes: MicroserviceType[] = [
        { id: 'ad51b900-6219-4986-9def-4c9768335384', name: 'blah' }
    ];

    constructor(private readonly _dataSource: DataSource) {
    }

    attached(routeInfo: RouteInfo) {
        this.populateMicroserviceTypes();
    }

    private async populateMicroserviceTypes() {
        const query = gql`
            query {
                microservices {
                    allMicroserviceTypes {
                    id,
                    name
                    }
                }
            }
        `;

        const result = await this._dataSource.query<AllMicroserviceTypesResult>({ query });
        this.microserviceTypes = result.data.microservices.allMicroserviceTypes;
    }
}
