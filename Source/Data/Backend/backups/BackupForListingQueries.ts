// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Resolver, Query, Ctx, Arg } from 'type-graphql';
import { injectable } from 'tsyringe';
import { ILogger } from '@dolittle/vanir-backend';
import { Context } from '@dolittle/vanir-backend/dist/web';
import { Guid } from '@dolittle/rudiments';
import { BackupForListing } from './BackupForListing';


@injectable()
@Resolver(BackupForListing)
export class BackupForListingQueries {

    constructor(
        private readonly _logger: ILogger) {
    }

    @Query(() => [BackupForListing])
    async allBackupsForListing(
        @Arg('applicationId') applicationId: Guid,
        @Arg('microservice') microservice: string,
        @Arg('tenantId') tenantId: Guid,
        @Ctx() context: Context) {

        const backups: BackupForListing[] = [
            {
                id: Guid.parse('4221cedd-8d25-4a7c-8745-d55cebeccbfb'),
                applicationId: Guid.parse('853ebea1-1e6b-4fee-9855-10d1df5cad1e'),
                microservice: 'studio-dev-applications',
                tenantId: Guid.parse('84d94e56-948f-4734-9b4a-b48386a6109d'),
                name: 'Applications dev backup',
                date: new Date(2021, 1, 21, 11, 37)
            },
            {
                id: Guid.parse('982f3f26-2e49-472c-9442-4d11b373060e'),
                applicationId: Guid.parse('853ebea1-1e6b-4fee-9855-10d1df5cad1e'),
                microservice: 'studio-dev-applications',
                tenantId: Guid.parse('ff5948e6-dc81-4132-918f-50b42d5fe6b6'),
                name: 'Applications dev backup',
                date: new Date(2021, 1, 21, 11, 39)
            },
            {
                id: Guid.parse('58151228-a2fb-4ba2-aabc-5e50f35e0ffd'),
                applicationId: Guid.parse('853ebea1-1e6b-4fee-9855-10d1df5cad1e'),
                microservice: 'studio-dev-events',
                tenantId: Guid.parse('84d94e56-948f-4734-9b4a-b48386a6109d'),
                name: 'Ultimate backup',
                date: new Date(2021, 1, 23, 13, 37)
            },
            {
                id: Guid.parse('213ff215-3395-4142-8a3a-aebdb26de8fd'),
                applicationId: Guid.parse('853ebea1-1e6b-4fee-9855-10d1df5cad1e'),
                microservice: 'studio-dev-events',
                tenantId: Guid.parse('84d94e56-948f-4734-9b4a-b48386a6109d'),
                name: 'Ultimate backup',
                date: new Date(2021, 1, 23, 12, 37)
            },
            {
                id: Guid.parse('3324d5e5-e2cc-4654-9b12-f8aaa156f2f7'),
                applicationId: Guid.parse('853ebea1-1e6b-4fee-9855-10d1df5cad1e'),
                microservice: 'studio-dev-events',
                tenantId: Guid.parse('ff5948e6-dc81-4132-918f-50b42d5fe6b6'),
                name: 'Ultimate backup',
                date: new Date(2021, 1, 23, 12, 39)
            },
            {
                id: Guid.parse('45309fb6-2e0f-43d1-9665-325099a6aaf6'),
                applicationId: Guid.parse('853ebea1-1e6b-4fee-9855-10d1df5cad1e'),
                microservice: 'studio-dev-portal',
                tenantId: Guid.parse('84d94e56-948f-4734-9b4a-b48386a6109d'),
                name: 'All the events and then some',
                date: new Date(2021, 1, 21, 12, 37)
            },
            {
                id: Guid.parse('61376499-a307-4f17-b528-5afba2f952d2'),
                applicationId: Guid.parse('853ebea1-1e6b-4fee-9855-10d1df5cad1e'),
                microservice: 'studio-dev-portal',
                tenantId: Guid.parse('84d94e56-948f-4734-9b4a-b48386a6109d'),
                name: 'All the events and then some',
                date: new Date(2021, 1, 21, 12, 37)
            },
            {
                id: Guid.parse('25e85230-7cf2-4ac6-ab4c-48b31875d855'),
                applicationId: Guid.parse('853ebea1-1e6b-4fee-9855-10d1df5cad1e'),
                microservice: 'studio-dev-portal',
                tenantId: Guid.parse('d3472df7-0720-4d53-b2c8-9289dccd4e98'),
                name: 'All the events and then some',
                date: new Date(2021, 1, 21, 11, 35)
            }
        ];

        return backups.filter(_ => _.applicationId.equals(applicationId) && _.microservice === microservice && _.tenantId.equals(tenantId));
    }
}
