// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';
import { Host } from '@dolittle/vanir-backend';
import { RegisterRoutes } from './routes';
const swaggerDoc = require('./swagger.json');

import * as AdaptersDomain from './domain/adapters';
import * as AdaptersEvents from './events/adapters';

import * as ConnectorsDomain from './domain/connectors';
import * as ConnectorsEvents from './events/connectors';
import * as ConnectorsRead from './read/connectors';

import * as EntitiesDomain from './domain/entities';
import * as EntitiesEvents from './events/entities';
import * as EntitiesRead from './read/entities';

import * as MinersDomain from './domain/miners';
import * as MinersEvents from './events/miners';
import * as MinersRead from './read/miners';


(async () => {
    await Host.start({
        graphQLResolvers: [
            ...AdaptersDomain.CommandHandlers,
            ...ConnectorsDomain.CommandHandlers,
            ...ConnectorsRead.Queries,
            ...EntitiesDomain.CommandHandlers,
            ...EntitiesRead.Queries,
            ...MinersDomain.CommandHandlers,
            ...MinersRead.Queries
        ],
        eventTypes: [
            ...AdaptersEvents.Events,
            ...ConnectorsEvents.Events,
            ...EntitiesEvents.Events,
            ...MinersEvents.Events
        ],
        swaggerDoc,
        expressCallback: (app) => {
            RegisterRoutes(app);
        }
    });
})();
