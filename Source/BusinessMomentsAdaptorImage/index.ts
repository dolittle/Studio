// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
//test comment
import { createServer, startServer } from './server';
import { MongodbRawDataStorage } from './RawDataStorage';
import { Client } from '@dolittle/sdk';
import { WebhookReceived } from './WebhookReceived';
import { WebhookReceivedHandler } from './wehbookReceivedHandler';

const rawDataStorage = new MongodbRawDataStorage();
export const client = Client.forMicroservice('a87b3411-7f23-4ea3-9b74-f6fc7f7c5481')
    .withEventTypes((eventTypes) => eventTypes.register(WebhookReceived))
    .withEventHandlers((builder) => builder.register(WebhookReceivedHandler))
    .build();
// TODO: inject dependency with IoC in the future.
const app = createServer(rawDataStorage);

startServer(app);
