// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';
import { Host } from '@dolittle/vanir-backend';
import { RegisterRoutes } from './routes';
const swaggerDoc = require('./swagger.json');

import * as ConnectorsDomain from './domain/connectors';
import * as ConnectorsRead from './read/connectors';

(async () => {
    await Host.start({
        graphQLResolvers: [
            ...ConnectorsDomain.CommandHandlers,
            ...ConnectorsRead.Queries
        ],
        swaggerDoc,
        expressCallback: (app) => {
            RegisterRoutes(app);
        }
    });
})();
