// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Query, Resolver, Ctx } from 'type-graphql';

import { ILogger } from '@dolittle/vanir-backend';
import { Context } from '@dolittle/vanir-backend/dist/web';

import { ApplicationForListing } from './ApplicationForListing';
import { fetchApplications } from './api';

@injectable()
@Resolver(ApplicationForListing)
export class ApplicationForListingQueries {
    constructor(
        private readonly _logger: ILogger,
    ) { }

    @Query((returns) => ApplicationForListing)
    async allApplicationsForListing(@Ctx() ctx: Context): Promise<ApplicationForListing> {
        if (ctx.tenantId === '') {
            return {
                applications: [],
                tenant: {
                    id: '',
                    name: ''
                }
            } as ApplicationForListing;
        }

        const data = await fetchApplications(ctx.tenantId);
        return data as ApplicationForListing;
    }
}

