// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Query, Resolver, Ctx } from 'type-graphql';

import { ILogger } from '@dolittle/vanir-backend';
import { Context } from '@dolittle/vanir-backend/dist/web';
import { IApplicationNamespaces, IMicroserviceResources } from '@shared/k8s';

import { ApplicationForListing } from './ApplicationForListing';
import { MicroserviceForListing } from './MicroserviceForListing';

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
        const namespaces = this._applicationNamespaces.getNamespacesForTenant(ctx.tenantId);
        return (await Promise.all(namespaces
            .map(async (namespace) => {
                const deployments = await this._microserviceResources.getDeployments(namespace.metadata!.name!, ctx);
                return { namespace, deployments };
            })))
            .map(async ({ namespace, deployments }) => {
                const guid = namespace.metadata!.annotations['dolittle.io/application-id'];

                const application = new ApplicationForListing();
                application._id = guid;
                application.name = namespace.metadata!.labels!.application;

                application.microservices = deployments
                    .filter(_ => _.metadata?.labels?.microservice)
                    .map(deployment => {
                        const microservice = new MicroserviceForListing();
                        microservice._id = deployment.metadata!.name;
                        microservice.name = `${deployment.metadata!.labels!.microservice}-${deployment.metadata!.labels!.environment}`;
                        return microservice;
                    });

                return application;
            });
    }
}
