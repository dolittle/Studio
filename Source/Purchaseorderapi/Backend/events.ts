import { eventType } from '@dolittle/sdk.events';

export class PurchaseOrderLineCreated {

    constructor(readonly username: string /* CHID */,
        readonly facilityNumber: string /* FACI */,
        readonly suppplierId: string /* SUNO */) {
    }

}

export class PurchaseOrderLineUpdated {

    constructor(readonly username: string,
        readonly facilityNumber: string) {
    }

}

export class PurchaseOrderLineOrderedQuantityChanged {

    constructor(readonly facilityNumber: string) {
    }

}
