import { eventType } from '@dolittle/sdk.events';

@eventType('3f6c2333-14f1-4a61-a5ca-7f9b4231313d')
export class PurchaseOrderCreated {
    constructor(
        /* Id */
        readonly PurchaseOrderNumber: string,
        readonly FacilityNumber: string,
        readonly LowestStatus: string,
        readonly HighestStatus: string,
        readonly OrderDate: Date | null,
        readonly SupplierID: string,
        readonly PaymentTerms: string,
        readonly DeliveryMethod: string,
        readonly DeliveryTerms: string,
        readonly Reference: string,
        readonly SupplierReference: string,
        readonly RequestedDate: Date | null,
        readonly InternalReference: string,
        readonly OrderValueNet: number,
        readonly AmountPurchaseOrderLines: number,
        readonly TotalCost: number,
        readonly TotalQuantity: number,
        readonly InvoiceAddress: string,
        readonly ChangeNumber: number
    ) { }
}

@eventType('a1df01e2-7347-4c3c-aaec-c5e94cb093e3')
export class PurchaseOrderDeleted {
    constructor(readonly PurchaseOrderNumber: number) { }
}

@eventType('75edec4b-9fb8-48a4-8298-15bb8d202789')
export class PurchaseOrderFacilityNumberChanged {
    constructor(readonly PurchaseOrderNumber: string, readonly FacilityNumber: string) { }
}

@eventType('8a4c40af-8a53-4461-8713-5bf4c696c525')
export class PurchaseOrderLowestStatusChanged {
    constructor(readonly PurchaseOrderNumber: string, readonly LowestStatus: string) { }
}

@eventType('04a50dd9-c0e6-4075-ad3f-f457f2297430')
export class PurchaseOrderHighestStatusChanged {
    constructor(readonly PurchaseOrderNumber: string, readonly HighestStatus: string) { }
}

@eventType('2ef7b561-a669-4f76-b3f5-a1e655053b54')
export class PurchaseOrderSupplierIdChanged {
    constructor(readonly PurchaseOrderNumber: number, readonly SupplierId: string) { }
}

@eventType('49ea3565-e2b4-45f9-afb9-2c582a4e3907')
export class PurchaseOrderDeliveryMethodChanged {
    constructor(readonly PurchaseOrderNumber: number, readonly DeliveryMethod: string) { }
}

@eventType('e6440f69-1a0e-4570-829a-a34991da5743')
export class PurchaseOrderReferenceChanged {
    constructor(readonly PurchaseOrderNumber: string, readonly Reference: string) { }
}

@eventType('ef725092-5e2e-41fe-964f-daada254b294')
export class PurchaseOrderSupplierReferenceChanged {
    constructor(
        readonly PurchaseOrderNumber: string,
        readonly SupplierReference: string
    ) { }
}

@eventType('5af01a7c-5271-446e-9dce-650abf2a5aaa')
export class PurchaseOrderRequestedDateChanged {
    constructor(readonly PurchaseOrderNumber: string, readonly RequestedDate: number) { }
}

@eventType('8b16248a-e717-4429-b990-dc772c0abfba')
export class PurchaseOrderInternalReferenceChanged {
    constructor(
        readonly PurchaseOrderNumber: string,
        readonly InternalReference: string
    ) { }
}

@eventType('8036ec2b-2b79-44c7-a628-45ce3afa808b')
export class PurchaseOrderNetOrderValueChanged {
    constructor(readonly PurchaseOrderNumber: string, readonly OrderValueNet: number) { }
}

@eventType('6692b5d8-9ccf-4be8-a227-f4fe1b9c4a1b')
export class PurchaseOrderNumberOfPurchaseOrderLinesChanged {
    constructor(
        readonly PurchaseOrderNumber: string,
        readonly AmountPurchaseOrderLines: number
    ) { }
}

@eventType('477a05db-b5a2-4e3f-8d23-57b3546ca055')
export class PurchaseOrderTotalOrderCostChanged {
    constructor(readonly PurchaseOrderNumber: string, readonly TotalCost: number) { }
}

@eventType('c4259df4-a7cc-4b25-bc60-94794f874bff')
export class PurchaseOrderTotalQuantityChanged {
    constructor(readonly PurchaseOrderNumber: string, readonly TotalQuantity: number) { }
}

@eventType('b495cc26-4c2c-4bb2-b2bd-a10542bd8929')
export class PurchaseOrderOurInvoicingAddressChanged {
    constructor(readonly PurchaseOrderNumber: string, readonly InvoiceAddress: string) { }
}

@eventType('3dd08960-0a14-4023-b335-56492ed3e5f1')
export class PurchaseOrderDeliveryTerms {
    constructor(readonly PurchaseOrderNumber: number, readonly DeliveryTerms: string) { }
}

@eventType('39d112db-672b-4d80-9533-ad4671beab6d')
export class PurchaseOrderPaymentTermsChanged {
    constructor(readonly PurchaseOrderNumber: string, readonly PaymentTerms: string) { }
}

@eventType('f08c3984-bc19-4329-9465-34bde48c7890')
export class PurchaseOrderDateChanged {
    constructor(readonly PurchaseOrderNumber: string, readonly OrderDate: number) { }
}

@eventType('2e40beb0-44f3-49ee-ba09-d218539999e8')
export class PurchaseOrderChangedNumberChanged {
    constructor(readonly PurchaseOrderNumber: string, readonly ChangeNumber: number) { }
}
