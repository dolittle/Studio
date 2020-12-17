// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Query, Resolver, Ctx } from 'type-graphql';
import { V1Deployment } from '@kubernetes/client-node';

import { Guid } from '@dolittle/rudiments';

import { ILogger } from '@shared/backend/logging';
import { IApplicationNamespaces, IMicroserviceResources } from '@shared/backend/k8s';
import { Context } from '@shared/backend/web';

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
        const deployments = await Promise.all(namespaces.map(async (namespace) => {
            const deployments = await this._microserviceResources.getDeployments(namespace.metadata!.name!);
            return { namespace, deployments };
        }));
        return deployments.map(async ({ namespace, deployments }) => {
            const guid = namespace.metadata?.name?.replace('application-', '');

            const application = new ApplicationForListing();
            application._id = guid;
            application.name = namespace.metadata?.labels ? namespace.metadata.labels.application : '[Not Set]';

            const microserviceDeployments = deployments.reduce((mss, deployment) => {
                const name = deployment.metadata?.labels?.microservice;
                if (!name) return mss;
                if (name in mss) return mss;
                mss[name] = deployment;
                return mss;
            }, {} as { [key: string]: V1Deployment});

            application.microservices = Object.values(microserviceDeployments).map(deployment => {
                const microservice = new MicroserviceForListing();
                microservice._id = deployment.metadata?.uid ?? 'oops';
                microservice.name = deployment.metadata?.labels?.microservice ?? '[Not Set]';
                return microservice;
            });

            return application;
        });
    }
}
