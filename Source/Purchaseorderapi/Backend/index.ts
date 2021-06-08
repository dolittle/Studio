import 'reflect-metadata';
import { Host } from '@dolittle/vanir-backend';
import { RegisterRoutes } from './routes';
import { Client } from '@dolittle/sdk';
import { PurchaseOrderLineUpdated } from './events';
import { PurchaseOrderLineUpdatedHandler } from './eventHandlers';
import { TenantId } from '@dolittle/sdk.execution';
// import { client } from './index';

const swaggerDoc = require('./swagger.json');

(async () => {
    try {
        await Host.start({
            swaggerDoc,
            expressCallback: (app) => {
                RegisterRoutes(app);
            },
        });
    } catch (err) {
        console.log('CATCHED ERROR', err);
    }

    // console.log('TEST2');
    // const client = Client.forMicroservice('f33d02df-088a-6946-a450-37c87ed6dc9e')
    //     .withEventTypes((eventTypes) => eventTypes.register(PurchaseOrderLineUpdated))
    //     .withEventHandlers((builder) => builder.register(PurchaseOrderLineUpdatedHandler))
    //     .build();

    // const purchaseOrderLineUpdated = new PurchaseOrderLineUpdated(
    //     'parham.barazesh',
    //     '12345'
    // );
    // client.eventStore
    //     .forTenant(TenantId.development)
    //     .commit(purchaseOrderLineUpdated, '59d578b2-3c58-483f-8865-961b29bd8b36');
})();
