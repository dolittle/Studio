// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import path from 'path';
import { startBackend } from '@shared/backend';

import { getSchema } from './schema';

(async () => {
    const schema = await getSchema();

    await startBackend({
        microserviceId: '590696bc-1c4e-4a14-b621-c2125713a974',
        prefix: '/',
        publicPath: path.join(__dirname, 'public'),
        port: 3001,
        dolittleRuntimePort: 50053,
        graphQLSchema: schema,
        defaultDatabaseName: 'portal',
        expressCallback: _ => {
        },
        dolittleCallback: _ => {
        }
    });
})();
