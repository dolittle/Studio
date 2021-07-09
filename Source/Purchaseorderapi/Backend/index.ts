import 'reflect-metadata';
import { Host } from '@dolittle/vanir-backend';
import { RegisterRoutes } from './routes';
import { Client } from '@dolittle/sdk';
import { PurchaseOrderLineUpdated, FacilityCreated } from './events';
import { PurchaseOrderLineUpdatedHandler, FacilityCreatedHandler } from './eventHandlers';
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

    console.log('TEST2');
    const client = Client.forMicroservice('1ff432ae-de10-403d-9a13-e66bba7d47f8')
        .withEventTypes((eventTypes) => eventTypes.register(PurchaseOrderLineUpdated))
        .withEventHandlers((builder) => builder.register(PurchaseOrderLineUpdatedHandler))
        .build();

    const purchaseOrderLineUpdated = new PurchaseOrderLineUpdated(
        'parham.barazesh',
        '12345'
    );
    client.eventStore
        .forTenant(TenantId.development)
        .commit(purchaseOrderLineUpdated, '59d578b2-3c58-483f-8865-961b29bd8b36');

    const client2 = Client.forMicroservice('1ff432ae-de10-403d-9a13-e66bba7d47f8')
        .withEventTypes((eventTypes) => eventTypes.register(FacilityCreated))
        .withEventHandlers((builder) => builder.register(FacilityCreatedHandler))
        .build();
    const facilityCreated = new FacilityCreated('12345');
    client2.eventStore
        .forTenant(TenantId.development)
        .commit(facilityCreated, '7495c578-3cbd-40ff-9434-d40044ccc7ff');
})();
