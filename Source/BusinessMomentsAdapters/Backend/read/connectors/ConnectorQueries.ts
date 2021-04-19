// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Resolver, Query } from 'type-graphql';
import { Connector } from './Connector';
import { IMongoDatabase } from '@dolittle/vanir-backend';
import { injectable } from 'tsyringe';

@Resolver()
@injectable()
export class ConnectorQueries {

    constructor(private readonly _mongoDatabase: IMongoDatabase) { }

    @Query(() => [Connector])
    async allConnectors(): Promise<Connector[]> {
        const collection = await this._mongoDatabase.collection(Connector);
        return collection.find().toArray();
    }
}
