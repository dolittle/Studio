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
        dolittleRuntimePort: 50057,
        graphQLSchema: schema,
        defaultDatabaseName: 'events',
        expressCallback: _ => {
        },
        dolittleCallback: _ => {
        }
    });
})();
