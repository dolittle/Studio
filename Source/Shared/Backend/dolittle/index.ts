// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export * from './IEventStore';

import { containerInstance } from '@shared/dependencyinversion';

import { Client, ClientBuilder } from '@dolittle/sdk';
import { logger } from '@shared/backend/logging/Logging';
import { Logger } from 'winston';

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
    return client;
}
