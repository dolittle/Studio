// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Host, logger } from '@dolittle/vanir-backend';
import queries from './queries';
import { PartitionId } from '@dolittle/sdk.events';

import tenant from '@shared/common/Tenant';
import Microservices from '@shared/common/Microservices';

import { projectFromEventsToReadModels } from './applications';

import { Bindings as K8sBindings } from '@shared/k8s';
import { RegisterRoutes } from './routes';

const swaggerDoc = require('./swagger.json');

(async () => {
    await Host.start({
        swaggerDoc,
        graphQLResolvers: queries,
        expressCallback: (app) => {
            RegisterRoutes(app);

            K8sBindings.initialize();
        },
        dolittleCallback: _ => {
            projectFromEventsToReadModels(_);

            _.withEventHorizons(eh => {
                /*
                eh.forTenant(tenant, ts => {
                    ts.fromProducerMicroservice(Microservices.k8s)
                        .fromProducerTenant(tenant)
                        .fromProducerStream('b628cd98-9d0d-4dbc-b4dd-56e89d7aa272')
                        .fromProducerPartition(PartitionId.unspecified.value)
                        .toScope('da92a933-a4c5-478d-a0c4-49aeef72f6d5')
                        .onSuccess((t, s, sr) => logger.info('EventHorizon subscription: Success'))
                        .onFailure((t, s, sr) => logger.error(`EventHorizon subscription: Failed - ${sr.failure?.reason}`))
                        .onCompleted((t, s, sr) => logger.info(`EventHorizon subscription: Completed`));
                });*/
            });
        }
    });
})();

