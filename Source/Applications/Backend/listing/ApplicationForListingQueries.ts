// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Query, Resolver, Ctx } from 'type-graphql';
import { Guid } from '@dolittle/rudiments';
import { ILogger } from '@shared/backend/logging';
import { ApplicationForListing } from './ApplicationForListing';
import { IK8sClient } from '@shared/backend/k8s';
import { Context } from '@shared/backend/web';
import { MicroserviceForListing } from './MicroserviceForListing';

@injectable()
@Resolver(ApplicationForListing)
export class ApplicationForListingQueries {
    constructor(
        private readonly _logger: ILogger,
        private readonly _k8sClient: IK8sClient
    ) {}

    @Query((returns) => [ApplicationForListing])
    async allApplicationsForListing(@Ctx() ctx: Context) {
        const namespaces = await this._k8sClient.getNamespaces();
        const applications = (
            await Promise.all(
                namespaces.items.map(async (namespace) => {
                    const pods = await this._k8sClient.getPods(namespace.metadata.name);
                    return { namespace, pods };
                })
            )
        ).map(async ({ namespace, pods }) => {
            const guid = namespace.metadata.name.replace('application-', '');
            const application = new ApplicationForListing();
            application._id = Guid.parse(guid).toString();
            application.name = namespace.metadata.labels.application || 'unknown';
            application.microservices = pods.items.map((pod) => {
                const id = pod.metadata.name;
                const name = pod.metadata.labels.microservice || 'unknown';
                return { _id: id, name } as MicroserviceForListing;
            });
            return application;
        });

        return applications;
    }
}
