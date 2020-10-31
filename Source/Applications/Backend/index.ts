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
        dolittleRuntimePort: 50055,
        graphQLSchema: schema,
        defaultDatabaseName: 'applications',
        expressCallback: _ => {
        },
        dolittleCallback: _ => {
        }
    });
})();
