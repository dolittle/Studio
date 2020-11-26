// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import path from 'path';
import { startBackend } from '@shared/backend';
import { getSchema } from './schema';
import { PartitionId } from '@dolittle/sdk.events';

import tenant from '@shared/backend/Tenant';
import Microservices from '@shared/backend/Microservices';

import { registerDolittle as applicationsRegisterDolittle } from './applications';

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
        defaultEventStoreDatabaseName: 'event_store_applications',
        expressCallback: _ => {
        },
        dolittleCallback: _ => {
            applicationsRegisterDolittle(_);

            _.withEventHorizons(eh => {
                eh.forTenant(tenant, ts => {
                    ts.fromProducerMicroservice(Microservices.k8s)
                        .fromProducerTenant(tenant)
                        .fromProducerStream('b628cd98-9d0d-4dbc-b4dd-56e89d7aa272')
                        .fromProducerPartition(PartitionId.unspecified.value)
                        .toScope('da92a933-a4c5-478d-a0c4-49aeef72f6d5')
                        .onSuccess((t, s, sr) => console.log('Subscription: Success'))
                        .onFailure((t, s, sr) => console.log(`Subscription: Failed - ${sr.failure?.reason}`))
                        .onCompleted((t, s, sr) => console.log(`Subscription: Completed`));
                });
            });
        }
    });
})();
