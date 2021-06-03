import { EventContext } from '@dolittle/sdk.events';
import { eventHandler, handles } from '@dolittle/sdk.events.handling';
import { WebhookReceived } from './WebhookReceived';

@eventHandler('ed6d9f23-64d0-4009-a19b-a07301fa0c98')
export class WebhookReceivedHandler {
    @handles(WebhookReceived)
    webhookReceived(event: WebhookReceived, eventContext: EventContext) {
        console.log(
            `webhook received status: ${event.status} \n description: ${event.message}`
        );
    }
}
