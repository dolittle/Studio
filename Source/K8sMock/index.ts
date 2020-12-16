// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import path from 'path';
import { startBackend } from '@shared/backend';
import swaggerUi from 'swagger-ui-express';

import { getSchema } from './schema';
import { RegisterRoutes } from './routes';

const swagger = require('./swagger.json');

(async () => {
    const schema = await getSchema();

    await startBackend({
        microserviceId: 'c2e34414-5054-4050-8ee4-eb6f3265cce3',
        prefix: '/api/k8s',
        publicPath: './public',
        port: 3001,
        dolittleRuntimePort: 50055,
        graphQLSchema: schema,
        defaultDatabaseName: 'k8s',
        defaultEventStoreDatabaseName: 'event_store_k8smock',
        expressCallback: _ => {
            _.use(
                '/api/swagger',
                swaggerUi.serve,
                swaggerUi.setup(swagger)
            );

            RegisterRoutes(_);
        },
    });
})();
