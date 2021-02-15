// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

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
