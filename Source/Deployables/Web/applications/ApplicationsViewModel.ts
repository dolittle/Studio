// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { DataSource } from '@dolittle/vanir-web';
import gql from 'graphql-tag';
import { Guid } from '@dolittle/rudiments';

@injectable()
export class ApplicationsViewModel {
    constructor(private readonly _dataSource: DataSource) {

    }

    async createApplication(name: string) {
        const mutation = gql`
            mutation {
                applications {
                    createApplication(command: {
                        applicationId: "${Guid.create().toString()}"
                        name: "${name}"
                    })
                }
            }
        `;

        const result = await this._dataSource.mutate({ mutation });
        debugger;
    }
}
