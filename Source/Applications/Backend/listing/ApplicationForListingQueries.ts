// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import fetch from 'node-fetch';
import { injectable } from 'tsyringe';
import { Query, Resolver, Arg } from 'type-graphql';
import { Guid } from '@dolittle/rudiments';
import { ILogger } from '@shared/backend/logging';
import { NamespaceList } from '@shared/backend/k8s/NamespaceList';
import { ApplicationForListing, ApplicationModel } from './ApplicationForListing';
import { IK8sClient } from '@shared/backend/k8s';



@injectable()
@Resolver(ApplicationForListing)
export class ApplicationForListingQueries {
    constructor(
        private readonly _logger: ILogger,
        private readonly _k8sClient: IK8sClient
    ) {}

    @Query((returns) => [ApplicationForListing])
    async allApplicationsForListing() {
        const namespaces = await this._k8sClient.getNamespaces();

        const applications = namespaces.items.map((_) => {
            const guid = _.metadata.name.replace('application-', '');
            const application = new ApplicationForListing();
            application._id = Guid.parse(guid).toString();
            application.name = _.metadata.labels.application || 'unknown';
            return application;
        });

        return applications;
    }
}


