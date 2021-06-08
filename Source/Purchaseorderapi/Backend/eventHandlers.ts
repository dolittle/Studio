import { EventContext } from '@dolittle/sdk.events';
import { eventHandler, handles } from '@dolittle/sdk.events.handling';
import { PurchaseOrderLineUpdated } from './events';

@eventHandler('808fd9f2-235e-462b-beba-fbfae6518802')
export class PurchaseOrderLineUpdatedHandler {
    @handles(PurchaseOrderLineUpdated)
    webhookReceived(event: PurchaseOrderLineUpdated, eventContext: EventContext) {
        console.log(
            `Purchase Order Line Updated: ${event.username} \n description: ${event.facilityNumber}`
        );
    }
}
