// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import path from 'path';
import { startBackend } from '@shared/backend';
import { getSchema } from './schema';
import { PartitionId } from '@dolittle/sdk.events';

import tenant from '@shared/backend/Tenant';
import Microservices from '@shared/backend/Microservices';

import { projectFromEventsToReadModels } from './microservices';

(async () => {
    const schema = await getSchema();

    await startBackend({
        microserviceId: 'A9CF063D-415F-4F83-A528-2F0D6057F05D',
        prefix: '/_/microservices',
        publicPath: path.join(__dirname, 'public'),
        port: 3004,
        dolittleRuntimePort: 50061,
        graphQLSchema: schema,
        defaultDatabaseName: 'microservices',
        expressCallback: _ => {
        },
        dolittleCallback: _ => {
            projectFromEventsToReadModels(_);

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
