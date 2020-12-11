// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import fetch from 'node-fetch';
import { injectable } from 'tsyringe';
import { Query, Resolver, Arg } from 'type-graphql';
import { Guid } from '@dolittle/rudiments';
import { ILogger } from '@shared/backend/logging';
import { NamespaceList } from '@shared/backend/k8s/NamespaceList';
import { ApplicationForListing, ApplicationModel } from './ApplicationForListing';



@injectable()
@Resolver(ApplicationForListing)
export class ApplicationForListingQueries {
    constructor(private readonly _logger: ILogger) {
    }

    @Query(returns => [ApplicationForListing])
    async allApplicationsForListing() {

        const response = await fetch('http://localhost:3001/api/v1/namespaces');
        const namespaces = await response.json() as NamespaceList;

        const applications = namespaces.items.map(_ => {
            const guid = _.metadata.name.replace('application-', '');
            const application = new ApplicationForListing();
            application._id = Guid.parse(guid).toString();
            application.name = _.metadata.labels.application || 'unknown';
            return application;
        });

        return applications;
    }
}
