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

export async function initialize(port: number, callback?: DolittleClientBuilderCallback): Promise<Client> {
    let runtimePort = port;
    if (process.env.DOLITTLE_RUNTIME_PORT) {
        runtimePort = parseInt(process.env.DOLITTLE_RUNTIME_PORT);
    }
    const clientBuilder = Client
        .forMicroservice('acfda18a-8ad7-42fe-b363-8c6c289cb0ff')
        .withLogging(logger as Logger)
        .withContainer(containerInstance)
        .withRuntimeOn('localhost', runtimePort);

    if (callback) callback(clientBuilder);

    const client = clientBuilder.build();

    const eventStore = client.eventStore.forTenant('508c1745-5f2a-4b4c-b7a5-2fbb1484346d');
    container.registerInstance(IEventStore as constructor<IEventStore>, eventStore);
    container.registerInstance(IEventTypes as constructor<IEventTypes>, client.eventTypes);

    return client;
}
