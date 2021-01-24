// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Resolver, Query, Ctx, Arg } from 'type-graphql';
import { injectable } from 'tsyringe';
import { Context } from '@dolittle/vanir-backend/dist/web';
import { Guid } from '@dolittle/rudiments';
import { Tenant } from './Tenant';
import { ILogger } from '@dolittle/vanir-backend';

@injectable()
@Resolver(Tenant)
export class TenantQueries {
    constructor(
        private readonly _logger: ILogger) {
    }

    @Query(() => [Tenant])
    async allTenantsForMicroservice(
        @Arg('applicationId') applicationId: Guid,
        @Arg('microservice') microservice: string,
        @Ctx() context: Context) {
        const tenants: Tenant[] = [
            { id: Guid.parse('84d94e56-948f-4734-9b4a-b48386a6109d'), name: 'Tenant 1' },
            { id: Guid.parse('ff5948e6-dc81-4132-918f-50b42d5fe6b6'), name: 'Tenant 2' },
            { id: Guid.parse('d3472df7-0720-4d53-b2c8-9289dccd4e98'), name: 'Tenant 3' }
        ];
        return tenants;
    }
}
