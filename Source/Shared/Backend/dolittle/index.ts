// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export * from './IEventStore';

import { constructor, containerInstance } from '@shared/dependencyinversion';

import { Client, ClientBuilder } from '@dolittle/sdk';
import { logger } from '@shared/backend/logging/Logging';
import { Logger } from 'winston';
import { container } from 'tsyringe';
import { IEventStore } from './IEventStore';
import { IEventTypes } from './IEventTypes';

export type DolittleClientBuilderCallback = (clientBuilder: ClientBuilder) => void;

export async function initialize(microserviceId: string, port: number, defaultDatabaseName: string, defaultEventStoreDatabaseName: string, callback?: DolittleClientBuilderCallback): Promise<Client> {
    const host = process.env.DATABASE_HOST || 'localhost';
    const databaseConnectionString = `mongodb://${host}:27017/`;
    const databaseName = process.env.DATABASE_NAME || defaultDatabaseName;

    let runtimePort = port;
    if (process.env.DOLITTLE_RUNTIME_PORT) {
        runtimePort = parseInt(process.env.DOLITTLE_RUNTIME_PORT);
    }
    const clientBuilder = Client
        .forMicroservice(microserviceId)
        .withLogging(logger as Logger)
        .withContainer(containerInstance)
        .withRuntimeOn('localhost', runtimePort)
        .withProjections(p => p.storeInMongo(databaseConnectionString, databaseName))
        .withProjectionIntermediates(p => p.storeInMongo(databaseConnectionString, defaultEventStoreDatabaseName))
    ;

    if (callback) callback(clientBuilder);

    const client = clientBuilder.build();

    const eventStore = client.eventStore.forTenant('508c1745-5f2a-4b4c-b7a5-2fbb1484346d');
    container.registerInstance(IEventStore as constructor<IEventStore>, eventStore);
    container.registerInstance(IEventTypes as constructor<IEventTypes>, client.eventTypes);

    return client;
}
