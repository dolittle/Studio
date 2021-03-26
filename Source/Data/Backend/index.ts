// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
// Trigger rebuild :(
import 'reflect-metadata';
import { Host } from '@dolittle/vanir-backend';
import { RegisterRoutes } from './routes';
import queries from './queries';

const swaggerDoc = require('./swagger.json');

(async () => {
    await Host.start({
        swaggerDoc,
        graphQLResolvers: queries,
        expressCallback: (app) => {
            RegisterRoutes(app);
        }
    });
})();
