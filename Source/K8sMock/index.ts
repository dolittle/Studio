// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import path from 'path';
import { startBackend } from '@shared/backend';
import swaggerUi from 'swagger-ui-express';

import { getSchema } from './schema';
import { RegisterRoutes } from './routes';
import { RegisterEventTypes } from './applications/EventTypes';
import { EventContext, PartitionId } from '@dolittle/sdk.events';
import { PartitionedFilterResult } from '@dolittle/sdk.events.filtering';

(async () => {
    const schema = await getSchema();

    const swagger = await import('./public/swagger.json');

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
                swaggerUi.setup(swagger)
            );

            RegisterRoutes(_);
        },
        dolittleCallback: _ => {
            RegisterEventTypes(_);

            _.withFilters(filterBuilder =>
                filterBuilder
                    .createPublicFilter('b628cd98-9d0d-4dbc-b4dd-56e89d7aa272', fb =>
                        fb.handle((event: any, context: EventContext) => {
                            return new PartitionedFilterResult(true, PartitionId.unspecified);
                        })
                    )
            );
        }
    });
})();
