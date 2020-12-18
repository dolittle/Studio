// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Query, Resolver, Arg, Ctx } from 'type-graphql';
import { injectable } from 'tsyringe';

import { ILogger } from '@shared/backend/logging';
import { Context } from '@shared/backend/web';
import { IMicroserviceResources } from  '@shared/backend/k8s';

import { Microservice } from './Microservice';

@injectable()
@Resolver(Microservice)
export class MicroserviceQueries {
    constructor(
        private readonly _logger: ILogger,
        private readonly _microserviceResources: IMicroserviceResources
        ) {}

    @Query(returns => Microservice)
    async microservice(
        @Arg('applicationId', { defaultValue: '' }) applicationId: string,
        @Arg('microserviceId', { defaultValue: '' }) microserviceId: string,
        @Ctx() ctx: Context) {

        const deployment = await this._microserviceResources.getDeployment(`application-${applicationId}`, microserviceId, ctx);

        const microservice = new Microservice();
        microservice._id = deployment.metadata?.name;
        microservice.name = `${deployment.metadata?.labels?.microservice}-${deployment.metadata?.labels?.environment}`;

        const containers = deployment.spec?.template.spec?.containers ?? [];
        microservice.headImage = containers.find(_ => _.name === 'head')?.image ?? '[Not Set]';
        microservice.runtimeImage = containers.find(_ => _.name === 'runtime')?.image ?? '[Not Set]';

        return microservice;
    }
}
