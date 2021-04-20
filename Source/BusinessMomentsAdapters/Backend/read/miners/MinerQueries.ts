// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Resolver, Query } from 'type-graphql';
import { Miner } from './Miner';
import { IMongoDatabase } from '@dolittle/vanir-backend';
import { injectable } from 'tsyringe';

@Resolver()
@injectable()
export class MinerQueries {

    constructor(private readonly _mongoDatabase: IMongoDatabase) { }

    @Query(() => [Miner])
    async allMiners(): Promise<Miner[]> {
        const collection = await this._mongoDatabase.collection(Miner);
        return collection.find().toArray();
    }
}
