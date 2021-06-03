import { eventType } from '@dolittle/sdk.events';

@eventType('0cb79cbf-bbe7-445c-99fa-0db6f7f24d4f')
export class WebhookReceived {
    constructor(readonly status: boolean) {}
}
