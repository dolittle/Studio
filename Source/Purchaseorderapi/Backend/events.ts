import { eventType } from '@dolittle/sdk.events';

// @eventType('d9933b1f-c70f-41a4-9747-545a03559e2d')
// export class PurchaseOrderLineCreated {
//     constructor(
//         readonly username: string /* CHID */,
//         readonly facilityNumber: string /* FACI */,
//         readonly suppplierId: string /* SUNO */
//     ) {}
// }
@eventType('3f6c2333-14f1-4a61-a5ca-7f9b4231313d')
export class PurchaseOrderCreated {
    constructor(
        /* Id */
        readonly PurchaseOrderNumber: number,
        readonly FacilityNumber: string,
        readonly LowestStatus: string,
        readonly HighestStatus: string,
        readonly OrderDate: number,
        readonly SupplierID: string,
        readonly PaymentTerms: string,
        readonly DeliveryMethod: string,
        readonly DeliveryTerms: string,
        readonly Reference: string,
        readonly SupplierReference: string,
        readonly RequestedDate: number,
        readonly InternalReference: string,
        readonly OrderValueNet: number,
        readonly AmountPurchaseOrderLines: number,
        readonly TotalCost: number,
        readonly TotalQuantity: number,
        readonly InvoiceAddress: string
    ) {}
}

@eventType('a1df01e2-7347-4c3c-aaec-c5e94cb093e3')
export class PurchaseOrderDeleted {
    constructor(readonly PurchaseOrderNumber: number) {}
}

@eventType('e429ec86-94c2-4ba2-a80d-6027f522ad18')
export class PurchaseOrderUpdated {
    constructor(
        readonly FacilityNumber: string,
        readonly PurchaseOrderNumber: number,
        readonly LowestStatus: string,
        readonly HighestStatus: string,
        readonly OrderDate: number,
        readonly SupplierID: string,
        readonly PaymentTerms: string,
        readonly DeliveryMethod: string,
        readonly DeliveryTerms: string,
        readonly Reference: string,
        readonly SupplierReference: string,
        readonly RequestedDate: number,
        readonly InternalReference: string,
        readonly OrderValueNet: number,
        readonly AmountPurchaseOrderLines: number,
        readonly TotalCost: number,
        readonly TotalQuantity: number,
        readonly InvoiceAddress: string
    ) {}
}

////////////

@eventType('2165c455-1ad0-46be-bb0d-fc2df1801b1a')
export class PurchaseOrderLineUpdated {
    constructor(readonly username: string, readonly facilityNumber: string) {}
}
// @eventType('21b72991-7256-4dfd-82d1-4976aade904a')
// export class PurchaseOrderLineOrderedQuantityChanged {
//     constructor(readonly facilityNumber: string) {}
// }

@eventType('8c9b617a-6823-44b4-b13f-ea6e572871e1')
export class FacilityCreated {
    constructor(readonly FacilityNumber: string) {}
}

@eventType('ecd9960e-e2a9-43b1-a6f0-793e83e0aef8')
export class FacilityDeleted {
    constructor(readonly FacilityNumber: string) {}
}
@eventType('75edec4b-9fb8-48a4-8298-15bb8d202789')
export class FacilityUpdated {
    constructor(readonly FacilityNumber: string) {}
}
@eventType('65536f75-d934-46ce-bebb-cce5985ee8c9')
export class PurchaseOrderNumberCreated {
    constructor(readonly OrderId: string) {}
}

@eventType('65c6f19a-184b-4ba1-92e2-333b3ad52283')
export class PurchaseOrderNumberUpdated {
    constructor(readonly OrderId: string) {}
}

@eventType('25e68333-9c2f-4447-93a2-35ba8951ffb2')
export class PurchaseOrderLineCreated {
    // TODO: add more properties!
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly ItemNumber: string,
        readonly Facility: string,
        readonly HighestStatus: string,
        readonly LowestStatus: string,
        readonly DiferentDeliveryAdress: string,
        readonly SupplierId: string,
        readonly SupplierItemNumber: string,
        readonly ItemName: string
    ) {}
}
// @eventType('9bf543c6-5a34-4bd2-a762-808bf82e9097')
// export class PurchaseOrderLineUpdated {
//     constructor(readonly LineNumber: number) {}
// }
@eventType('3a1135fb-ab87-4a86-8996-25b0fcdddd8d')
export class PurchaseOrderLineDeleted {
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string
    ) {}
}

//////////////////
@eventType('0d8c39bd-658e-4e7f-bf43-39a7df19b8c8')
export class PurchaseOrderLineSubNumberUpdated {
    // TODO: need to add identifier: po number + linenumber (see PurchaseOrderLineDeleted)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string
    ) {}
}

@eventType('9ce6921c-d2b6-44c6-9f05-a17966ba2261')
export class HighestStatusPurchaseOrderUpdated {
    // TODO: add id. Is this on PO or PO Line?
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly HighestStatus: string
    ) {}
}

@eventType('65f24be8-63d6-417f-8e25-0b998c443dde')
export class LowestStatusPurchaseOrderUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly Status: string
    ) {}
}

@eventType('4bedb694-e24f-4a9f-b2a0-1926cd91f28e')
export class DifferentDeliveryAddressUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly DifferentDeliveryAddress: number
    ) {}
}

@eventType('f9755282-faa3-4a1c-8a92-5224540ab321')
export class SupplierUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly SupplierId: string
    ) {}
}

@eventType('02df3d40-7043-4e44-a062-cb5de62587de')
export class ItemUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly ItemId: string
    ) {}
}

@eventType('1cdec1e6-520d-4c8a-93aa-b42e83a9949a')
export class SupplierItemUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly SupplierItemId: string
    ) {}
}

@eventType('40717c50-fa8d-4d6a-9ff5-51a19715452c')
export class PurchaseOrderItemNameUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly ItemName: string
    ) {}
}

@eventType('be9b48ed-9898-4670-8899-0bc0a1631e8b')
export class PurchaseOrderItemDescriptionUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly ItemDescription: string
    ) {}
}

@eventType('13c1926a-d015-40eb-8182-9a2f10737fae')
export class SupplierOrderUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly SupplierOrderId: string
    ) {}
}

@eventType('66d0c57c-6090-4078-8730-11000f3f6b63')
export class PurchasePriceUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly Price: number
    ) {}
}

@eventType('1eddaa9c-b345-44f3-a4b5-5c315a141eb1')
export class ConfirmedPurchasePriceUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly ConfirmedPrice: number
    ) {}
}

@eventType('5de5f2c3-8d10-431e-9043-8ee9676104fd')
export class PurchaseOrderUnitOfMeasureUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly OrderUnitofMeasure: string
    ) {}
}

@eventType('e3a1fdd6-14c9-4507-8812-dbbcbbf3ef89')
export class PurchasePriceUnitOfMeasureUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly PriceUnitofMeasure: string
    ) {}
}

@eventType('b1db066c-5e41-400d-a41f-1fcb23ec66c5')
export class PurchasePriceQuantityUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly PriceQuantity: number
    ) {}
}

@eventType('1548b0c2-663f-4d47-8448-f885655a866e')
export class ConfirmedPurchasePriceQuantityUpdated {
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly ConfirmedPriceQuantity: number
    ) {}
}

@eventType('0de048ef-2fbe-4a3f-bcea-c4b74962c28c')
export class PurchasePriceTextUpdated {
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly PriceText: number
    ) {}
}

@eventType('e958a88a-4438-4bf1-8fc6-6507f61c08d5')
export class LineAmountOrderCurrencyUpdated {
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly Currency: number
    ) {}
}

@eventType('909ac72e-406e-4921-b60b-917e329c8268')
export class RequestedDeliveryDateUpdated {
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly RequestedDate: number
    ) {}
}

@eventType('169811e1-6a1b-4364-b788-84aca34da3c2')
export class ConfirmedDeliveryDateUpdated {
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly ConfirmedDate: number
    ) {}
}

@eventType('7c24ec83-88f1-4c2b-b370-716eabba2076')
export class OrderedQuantityAlternateUnitOfMeasureUpdated {
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly OrderedQuantityUnitOfMeasure: number
    ) {}
}

@eventType('05ba981f-cd77-44ab-96b2-c9ae96c4c679')
export class ConfirmedQuantityUpdated {
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly ConfirmedQuantity: number
    ) {}
}

@eventType('0e059c50-3c66-4183-9116-802434f92743')
export class DeliveryMethodUpdated {
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly Method: string
    ) {}
}

@eventType('2eb89073-4b8f-4985-88ff-89b718e8a80a')
export class DeliveryTermsUpdated {
    constructor(
        readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string,
        readonly Terms: string
    ) {}
}

//HEAD
@eventType('f08c3984-bc19-4329-9465-34bde48c7890')
export class PurchaseOrderDateUpdated {
    constructor(readonly PurchaseOrderNumber: string, readonly OrderDate: number) {}
}

@eventType('39d112db-672b-4d80-9533-ad4671beab6d')
export class PurchaseOrderPaymentTermsUpdated {
    constructor(readonly PurchaseOrderNumber: string, readonly PaymentTerms: string) {}
}

@eventType('e6440f69-1a0e-4570-829a-a34991da5743')
export class PurchaseOrderReferenceUpdated {
    constructor(readonly PurchaseOrderNumber: string, readonly Reference: string) {}
}

@eventType('ef725092-5e2e-41fe-964f-daada254b294')
export class PurchaseOrderSupplierReferenceUpdated {
    constructor(
        readonly PurchaseOrderNumber: string,
        readonly SupplierReference: string
    ) {}
}

@eventType('8b16248a-e717-4429-b990-dc772c0abfba')
export class PurchaseOrderOurReferenceNumberUpdated {
    constructor(
        readonly PurchaseOrderNumber: string,
        readonly InternalReference: string
    ) {}
}

@eventType('8036ec2b-2b79-44c7-a628-45ce3afa808b')
export class PurchaseOrderNetOrderValueUpdated {
    constructor(readonly PurchaseOrderNumber: string, readonly OrderValueNet: number) {}
}

@eventType('6692b5d8-9ccf-4be8-a227-f4fe1b9c4a1b')
export class PurchaseOrderNumberOfPurchaseOrderLinesUpdated {
    constructor(
        readonly PurchaseOrderNumber: string,
        readonly AmountPurchaseOrderLines: number
    ) {}
}

@eventType('477a05db-b5a2-4e3f-8d23-57b3546ca055')
export class PurchaseOrderTotalOrderCostUpdated {
    constructor(readonly PurchaseOrderNumber: string, readonly TotalCost: number) {}
}

@eventType('c4259df4-a7cc-4b25-bc60-94794f874bff')
export class PurchaseOrderTotalQuantityUpdated {
    constructor(readonly PurchaseOrderNumber: string, readonly TotalQuantity: number) {}
}

@eventType('b495cc26-4c2c-4bb2-b2bd-a10542bd8929')
export class PurchaseOrderOurInvoicingAddressUpdated {
    constructor(readonly PurchaseOrderNumber: string, readonly InvoiceAddress: string) {}
}
