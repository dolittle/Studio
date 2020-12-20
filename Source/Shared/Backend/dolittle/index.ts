// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export * from './IEventStore';

import { constructor, containerInstance } from '@shared/dependencyinversion';

import { Client, ClientBuilder } from '@dolittle/sdk';
import { Logger } from 'winston';
import { container } from 'tsyringe';
import { IEventStore } from './IEventStore';
import { IEventTypes } from './IEventTypes';
import { Configuration } from '../Configuration';
import { logger } from '../logging';

export type DolittleClientBuilderCallback = (clientBuilder: ClientBuilder) => void;

export async function initialize(configuration: Configuration, callback?: DolittleClientBuilderCallback): Promise<Client> {
    const databaseConnectionString = `mongodb://${configuration.database.host}:${configuration.database.port}/`;
    const databaseName = configuration.database.name;
    const eventStoreDatabaseConnectionString = `mongodb://${configuration.eventStore.host}:${configuration.eventStore.port}/`;
    const eventStoreDatabaseName = configuration.eventStore.name;

    logger.info(`Using '${databaseConnectionString}${databaseName}' for projections`);
    logger.info(`Using '${eventStoreDatabaseConnectionString}${eventStoreDatabaseName}' for projection intermediate state`);

    const clientBuilder = Client
        .forMicroservice(configuration.microserviceId)
        .withLogging(logger as Logger)
        .withContainer(containerInstance)
        .withRuntimeOn(configuration.dolittle.runtime.host, configuration.dolittle.runtime.port)
        .withProjections(p => p.storeInMongo(databaseConnectionString, databaseName))
        .withProjectionIntermediates(p => p.storeInMongo(eventStoreDatabaseConnectionString, eventStoreDatabaseName))
        ;

    callback?.(clientBuilder);

    const client = clientBuilder.build();

    const eventStore = client.eventStore.forTenant('508c1745-5f2a-4b4c-b7a5-2fbb1484346d');
    container.registerInstance(IEventStore as constructor<IEventStore>, eventStore);
    container.registerInstance(IEventTypes as constructor<IEventTypes>, client.eventTypes);

    return client;
}
