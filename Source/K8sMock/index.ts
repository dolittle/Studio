// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import path from 'path';
import { startBackend } from '@shared/backend';
import swaggerUi from 'swagger-ui-express';

import { getSchema } from './schema';

import Router from './routes';

(async () => {
    const schema = await getSchema();

    await startBackend({
        microserviceId: 'c2e34414-5054-4050-8ee4-eb6f3265cce3',
        prefix: '/api/k8s',
        publicPath: path.join(__dirname, 'public'),
        port: 3001,
        dolittleRuntimePort: 50055,
        graphQLSchema: schema,
        defaultDatabaseName: 'k8s',
        expressCallback: _ => {
            _.use(
                '/api/k8s/swagger',
                swaggerUi.serve,
                swaggerUi.setup(undefined, {
                    swaggerOptions: {
                        url: '/api/k8s/swagger.json',
                    },
                })
            );
            _.use(Router);
        },
        dolittleCallback: _ => {
        }
    });
})();
