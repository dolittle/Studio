// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import path from 'path';
import { startBackend } from '@shared/backend';

import { getSchema } from './schema';

(async () => {
    const schema = await getSchema();

    await startBackend({
        microserviceId: '05a823dd-0f0d-4157-bc46-14834cca3cd2',
        prefix: '/_/applications',
        publicPath: path.join(__dirname, 'public'),
        port: 3002,
        dolittleRuntimePort: 50057,
        graphQLSchema: schema,
        defaultDatabaseName: 'applications',
        expressCallback: _ => {
        },
        dolittleCallback: _ => {
        }
    });
})();
