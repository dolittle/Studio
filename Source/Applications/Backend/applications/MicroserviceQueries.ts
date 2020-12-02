// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Query, Resolver } from 'type-graphql';
import { ILogger } from '@shared/backend/logging';
import { injectable } from 'tsyringe';
import { Microservice, MicroserviceModel } from './Microservice';

@injectable()
@Resolver(Microservice)
export class MicroserviceQueries {
    constructor(private readonly _logger: ILogger) {
    }

    @Query(returns => [Microservice])
    async allMicroservices() {
        console.log('fetching all microservices');
        return MicroserviceModel.find().exec();
    }
}
