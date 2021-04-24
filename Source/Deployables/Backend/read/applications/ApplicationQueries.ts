// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Resolver, Query } from 'type-graphql';
import { injectable } from 'tsyringe';
import { Application } from './Application';
import { IMongoDatabase, graphRoot } from '@dolittle/vanir-backend';

@Resolver()
@graphRoot('applications')
@injectable()
export class ApplicationQueries {

    constructor(private readonly _mongoDatabase: IMongoDatabase) {
    }

    @Query(() => [Application])
    async allApplications(): Promise<Application[]> {
        const collection = await this._mongoDatabase.collection(Application);
        return collection.find().toArray();
    }
}
