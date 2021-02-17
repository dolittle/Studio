// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import fetch from 'node-fetch'

import { injectable } from 'tsyringe';
import { Query, Resolver, Ctx } from 'type-graphql';

import { ILogger } from '@dolittle/vanir-backend';
import { Context } from '@dolittle/vanir-backend/dist/web';


import { ApplicationForListing } from './ApplicationForListing';
import { getPlatformDownloadServerBasePath } from '../environment';

@injectable()
@Resolver(ApplicationForListing)
export class ApplicationForListingQueries {
    constructor(
        private readonly _logger: ILogger,
    ) {}

    @Query((returns) => ApplicationForListing)
    async allApplicationsForListing(@Ctx() ctx: Context) {
        console.log("ctx.tenantId", ctx.tenantId);
        if (ctx.tenantId == "") {
            return {} as ApplicationForListing;
        }

        let data = await fetchApplications(ctx.tenantId);
        return data;
    }
}

async function fetchApplications(tenantId: string): Promise<ApplicationForListing> {
    // TODO need to set the path to the download-server
    const response = await fetch(`${getPlatformDownloadServerBasePath()}/logs/applications/${tenantId}`, {
        headers: {
            'x-secret': 'fake'
        }
    });

    // waits until the request completes...
    if (!response.ok) {
        return {} as ApplicationForListing;
    }

    let data: ApplicationForListing = await response.json();
    return data;
  }


async function fetchTenants(): Promise<ApplicationForListing[]> {
    // TODO need to set the path to the download-server
    const response = await fetch(`${getPlatformDownloadServerBasePath()}/logs/customers`, {
        headers: {
            'x-secret': 'fake'
        }
    });

    // waits until the request completes...
    if (!response.ok) {
        return [];
    }

    let body = await response.json();
    return body.customers;
  }
