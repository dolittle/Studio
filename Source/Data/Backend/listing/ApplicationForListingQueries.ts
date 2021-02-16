// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import fetch from 'node-fetch'

import { injectable } from 'tsyringe';
import { Query, Resolver, Ctx } from 'type-graphql';

import { ILogger } from '@dolittle/vanir-backend';
import { Context } from '@dolittle/vanir-backend/dist/web';


import { ApplicationForListing, DolittleTenant } from './ApplicationForListing';

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
        console.log(data);
        return data;
    }
}

async function fetchApplications(tenantId: string): Promise<ApplicationForListing> {
    // TODO need to set the path to the download-server
    const response = await fetch(`http://localhost:8080/share/logs/applications/${tenantId}`, {
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
    /*
    let body: ApplicationForListing = {
        tenant: {
            name: data.tenant,
            id: tenantId,
        } as DolittleTenant,
        applications: data.applications,
    };

    return body;
    */
  }


async function fetchTenants(): Promise<ApplicationForListing[]> {
    // TODO need to set the path to the download-server
    const response = await fetch('http://localhost:8080/share/logs/customers', {
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
