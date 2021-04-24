// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Resolver, Query } from 'type-graphql';
import { Entity } from './Entity';
import { IMongoDatabase, graphRoot } from '@dolittle/vanir-backend';
import { injectable } from 'tsyringe';

@Resolver()
@graphRoot('entities')
@injectable()
export class EntityQueries {

    constructor(private readonly _mongoDatabase: IMongoDatabase) { }

    @Query(() => [Entity])
    async allEntities(): Promise<Entity[]> {
        const collection = await this._mongoDatabase.collection(Entity);
        return collection.find().toArray();
    }
}
