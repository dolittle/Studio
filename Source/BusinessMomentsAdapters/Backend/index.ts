// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';
import { Host } from '@dolittle/vanir-backend';
import { RegisterRoutes } from './routes';
const swaggerDoc = require('./swagger.json');

import * as AdaptersDomain from './domain/adapters';
import * as AdaptersEvents from './events/adapters';

import * as ConnectorsDomain from './domain/connectors';
import * as ConnectorsRead from './read/connectors';
import * as ConnectorsEvents from './events/connectors';

(async () => {
    await Host.start({
        graphQLResolvers: [
            ...AdaptersDomain.CommandHandlers,
            ...ConnectorsDomain.CommandHandlers,
            ...ConnectorsRead.Queries
        ],
        eventTypes: [
            ...AdaptersEvents.Events,
            ...ConnectorsEvents.Events
        ],
        swaggerDoc,
        expressCallback: (app) => {
            RegisterRoutes(app);
        }
    });
})();
