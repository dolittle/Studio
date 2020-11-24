import { eventType } from '@dolittle/sdk.events';



@eventType('bc47d761-eed9-4486-b66b-3adaa3a0f4c6')
export class MicroserviceCreated {
    constructor(readonly id: string = '', readonly name: string = '') { }
}
