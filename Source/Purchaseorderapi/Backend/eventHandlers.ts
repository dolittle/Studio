import { EventContext } from '@dolittle/sdk.events';
import { eventHandler, handles } from '@dolittle/sdk.events.handling';
import { PurchaseOrderLineUpdated, FacilityCreated } from './events';

@eventHandler('a6cca04c-2a19-4ce0-8928-6d6377cfa1e5')
export class PurchaseOrderLineUpdatedHandler {
    @handles(PurchaseOrderLineUpdated)
    webhookReceived(event: PurchaseOrderLineUpdated, eventContext: EventContext) {
        console.log(
            `Purchase Order Line Updated: ${event.username} \n description: ${event.facilityNumber}`
        );
    }
}

@eventHandler('47352355-269c-4b41-94c5-64ea4ad83103')
export class FacilityCreatedHandler {
    @handles(FacilityCreated)
    webhookReceived(event: FacilityCreated, eventContext: EventContext) {
        console.log(`Facility Created: ${event.FacilityNumber}`);
    }
}
