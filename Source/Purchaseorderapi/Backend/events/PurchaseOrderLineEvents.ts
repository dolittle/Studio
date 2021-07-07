// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { eventType } from '@dolittle/sdk.events';

@eventType('25e68333-9c2f-4447-93a2-35ba8951ffb2')
export class PurchaseOrderLineCreated {
    constructor(
        readonly PurchaseOrderNumber: string,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly ItemNumber: string,
        readonly Facility: string,
        readonly HighestStatus: string,
        readonly LowestStatus: string,
        readonly DiferentDeliveryAdress: number,
        readonly SupplierId: string,
        readonly SupplierItemNumber: string,
        readonly ItemName: string,
        readonly ChangeNumber: number
    ) { }
}

@eventType('3a1135fb-ab87-4a86-8996-25b0fcdddd8d')
export class PurchaseOrderLineDeleted {
    constructor(
        readonly PurchaseOrderNumber: string,
        readonly LineNumber: number // readonly SubLineNumber: number, // readonly itemNumber: string
    ) { }
}

// =============

@eventType('0d8c39bd-658e-4e7f-bf43-39a7df19b8c8')
export class PurchaseOrderLineSubNumberUpdated {
    // TODO: need to add identifier: po number + linenumber (see PurchaseOrderLineDeleted)
    constructor(
        readonly PurchaseOrderNumber: string,
        readonly LineNumber: number,
        readonly SubLineNumber: number // readonly itemNumber: string
    ) { }
}

@eventType('9ce6921c-d2b6-44c6-9f05-a17966ba2261')
export class PurchaseOrderLineHighestStatusUpdated {
    // TODO: add id. Is this on PO or PO Line?
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly HighestStatus: string
    ) { }
}

@eventType('65f24be8-63d6-417f-8e25-0b998c443dde')
export class PurchaseOrderLineLowestStatusUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly Status: string
    ) { }
}

@eventType('4bedb694-e24f-4a9f-b2a0-1926cd91f28e')
export class PurchaseOrderLineDifferentDeliveryAddressUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly DifferentDeliveryAddress: number
    ) { }
}

@eventType('f9755282-faa3-4a1c-8a92-5224540ab321')
export class PurchaseOrderLineSupplierUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly SupplierId: string
    ) { }
}

@eventType('02df3d40-7043-4e44-a062-cb5de62587de')
export class PurchaseOrderLineItemNumberUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string // readonly ItemId: string
    ) { }
}

@eventType('1cdec1e6-520d-4c8a-93aa-b42e83a9949a')
export class PurchaseOrderLineSupplierItemIdUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly SupplierItemId: string
    ) { }
}

@eventType('40717c50-fa8d-4d6a-9ff5-51a19715452c')
export class PurchaseOrderLineItemNameUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly ItemName: string
    ) { }
}

@eventType('be9b48ed-9898-4670-8899-0bc0a1631e8b')
export class PurchaseOrderLineItemDescriptionUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly ItemDescription: string
    ) { }
}

@eventType('13c1926a-d015-40eb-8182-9a2f10737fae')
export class PurchaseOrderLineSupplierOrderIdUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly SupplierOrderId: string
    ) { }
}

@eventType('66d0c57c-6090-4078-8730-11000f3f6b63')
export class PurchaseOrderLinePriceUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly Price: number
    ) { }
}

@eventType('1eddaa9c-b345-44f3-a4b5-5c315a141eb1')
export class PurchaseOrderLineConfirmedPriceUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly ConfirmedPrice: number
    ) { }
}

@eventType('e3a1fdd6-14c9-4507-8812-dbbcbbf3ef89')
export class PurchaseOrderLinePriceUnitOfMeasureUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly PriceUnitofMeasure: string
    ) { }
}

@eventType('b1db066c-5e41-400d-a41f-1fcb23ec66c5')
export class PurchaseOrderLinePriceQuantityUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly PriceQuantity: number
    ) { }
}

@eventType('1548b0c2-663f-4d47-8448-f885655a866e')
export class ConfirmedPurchasePriceQuantityUpdated {
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly ConfirmedPriceQuantity: number
    ) { }
}

@eventType('0de048ef-2fbe-4a3f-bcea-c4b74962c28c')
export class PurchaseOrderLinePriceTextUpdated {
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly PriceText: number
    ) { }
}

@eventType('e958a88a-4438-4bf1-8fc6-6507f61c08d5')
export class PurchaseOrderLineCurrencyUpdated {
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly Currency: number
    ) { }
}

@eventType('909ac72e-406e-4921-b60b-917e329c8268')
export class PurchaseOrderLineRequestedDateUpdated {
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly RequestedDate: Date | null
    ) { }
}

@eventType('169811e1-6a1b-4364-b788-84aca34da3c2')
export class ConfirmedDeliveryDateUpdated {
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly ConfirmedDate: Date | null
    ) { }
}

@eventType('5de5f2c3-8d10-431e-9043-8ee9676104fd')
export class PurchaseOrderLineUnitOfMeasureUpdated {
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly OrderUnitofMeasure: string
    ) { }
}

@eventType('2eb89073-4b8f-4985-88ff-89b718e8a80a')
export class PurchaseOrderLineDeliveryTermsUpdated {
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly Terms: string
    ) { }
}

@eventType('0e059c50-3c66-4183-9116-802434f92743')
export class PurchaseOrderLineDeliveryMethodUpdated {
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly Method: string
    ) { }
}

@eventType('05ba981f-cd77-44ab-96b2-c9ae96c4c679')
export class PurchaseOrderLineConfirmedQuantityUpdated {
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly ConfirmedQuantity: number
    ) { }
}

@eventType('7c24ec83-88f1-4c2b-b370-716eabba2076')
export class PurchaseOrderLineOrderedQuantityAlternateUnitOfMeasureUpdated {
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly OrderedQuantityUnitOfMeasure: number
    ) { }
}


@eventType('3b668c9b-e4a5-4afd-a787-ace28efe4140')
export class PurchaseOrderLineChangeNumberUpdated {
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly ChangeNumber: number
    ) { }
}
