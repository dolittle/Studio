// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import path from 'path';
import { startBackend } from '@shared/backend';

import { getSchema } from './schema';

(async () => {
    const schema = await getSchema();

    await startBackend({
        microserviceId: '81cad113-a001-45dc-86cb-7b1e725ae25e',
        prefix: '/_/events',
        publicPath: path.join(__dirname, 'public'),
        port: 3003,
        dolittleRuntimePort: 50059,
        graphQLSchema: schema,
        defaultDatabaseName: 'events',
        defaultEventStoreDatabaseName: 'event_store_applications',
        expressCallback: _ => {
        },
        dolittleCallback: _ => {
        }
    });
})();

