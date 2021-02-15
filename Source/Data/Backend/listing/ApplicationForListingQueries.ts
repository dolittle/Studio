// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import fetch from 'node-fetch'

import { injectable } from 'tsyringe';
import { Query, Resolver, Ctx } from 'type-graphql';

import { ILogger } from '@dolittle/vanir-backend';
import { Context } from '@dolittle/vanir-backend/dist/web';
import { IApplicationNamespaces, IMicroserviceResources } from '@shared/k8s';

import { ApplicationForListing } from './ApplicationForListing';

@injectable()
@Resolver(ApplicationForListing)
export class ApplicationForListingQueries {
    constructor(
        private readonly _logger: ILogger,
        private readonly _applicationNamespaces: IApplicationNamespaces,
        private readonly _microserviceResources: IMicroserviceResources
    ) {}

    @Query((returns) => [ApplicationForListing])
    async allApplicationsForListing(@Ctx() ctx: Context) {
        // curl -I 'http://localhost:3005/graphql'

        let body = await fetchTenants();
        console.log(body);

        return body.map(customer => {
            return {
                "tenant": customer.tenant,
                "applications": customer.applications.map(application => {
                    return {"name": application};
                }),
                "domains": customer.domains.map(domain => {
                    return {"name": domain};
                }),
            };
        });
        const backups: ApplicationForListing[] = [
        {
            "tenant": {
                "name": "Customer-Chris",
                "id": "fake",
            },
            "applications": [
                {"name":"Taco"}
            ],
            "domains": [
                {"name":"freshteapot-taco.dolittle.cloud"}
            ]
        }
        ];
        return backups;
    }
}


async function fetchTenants(): Promise<ApplicationForListing[]> {

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
