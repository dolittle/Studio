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
    ) { }
}

@eventType('a1df01e2-7347-4c3c-aaec-c5e94cb093e3')
export class PurchaseOrderDeleted {
    constructor(
        readonly PurchaseOrderNumber: number
    ) { }
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
    ) { }
}

////////////

@eventType('2165c455-1ad0-46be-bb0d-fc2df1801b1a')
export class PurchaseOrderLineUpdated {
    constructor(readonly username: string, readonly facilityNumber: string) { }
}
// @eventType('21b72991-7256-4dfd-82d1-4976aade904a')
// export class PurchaseOrderLineOrderedQuantityChanged {
//     constructor(readonly facilityNumber: string) {}
// }

@eventType('8c9b617a-6823-44b4-b13f-ea6e572871e1')
export class FacilityCreated {
    constructor(readonly FacilityNumber: string) { }
}

@eventType('ecd9960e-e2a9-43b1-a6f0-793e83e0aef8')
export class FacilityDeleted {
    constructor(readonly FacilityNumber: string) { }
}
@eventType('75edec4b-9fb8-48a4-8298-15bb8d202789')
export class FacilityUpdated {
    constructor(readonly FacilityNumber: string) { }
}
@eventType('65536f75-d934-46ce-bebb-cce5985ee8c9')
export class PurchaseOrderNumberCreated {
    constructor(readonly OrderId: string) { }
}

@eventType('65c6f19a-184b-4ba1-92e2-333b3ad52283')
export class PurchaseOrderNumberUpdated {
    constructor(readonly OrderId: string) { }
}

@eventType('25e68333-9c2f-4447-93a2-35ba8951ffb2')
export class PurchaseOrderLineCreated {
    // TODO: add more properties!
    constructor(readonly LineNumber: number) { }
}
// @eventType('9bf543c6-5a34-4bd2-a762-808bf82e9097')
// export class PurchaseOrderLineUpdated {
//     constructor(readonly LineNumber: number) {}
// }
@eventType('3a1135fb-ab87-4a86-8996-25b0fcdddd8d')
export class PurchaseOrderLineDeleted {
    constructor(readonly PurchaseOrderNumber: number,
        readonly LineNumber: number,
        readonly SubLineNumber: number,
        readonly itemNumber: string) { }
}

//////////////////
@eventType('0d8c39bd-658e-4e7f-bf43-39a7df19b8c8')
export class PurchaseOrderLineSubNumberUpdated {
    // TODO: need to add identifier: po number + linenumber (see PurchaseOrderLineDeleted)
    constructor(readonly SubLineNumber: number) { }
}

@eventType('9ce6921c-d2b6-44c6-9f05-a17966ba2261')
export class HighestStatusPurchaseOrderUpdated {
    // TODO: add id. Is this on PO or PO Line?
    constructor(readonly HighestStatus: string) { }
}

@eventType('65f24be8-63d6-417f-8e25-0b998c443dde')
export class LowestStatusPurchaseOrderUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(readonly Status: string) { }
}

@eventType('4bedb694-e24f-4a9f-b2a0-1926cd91f28e')
export class DifferentDeliveryAddressUpdated {
    // TODO: is this PO or PO Line? You need identifier (for the entity)
    constructor(readonly DifferentDeliveryAddress: number) { }
}

////////////
@eventType('63da33a0-b24d-4662-b93e-9e94ec60cfee')
export class SupplierCreated {
    constructor(readonly SupplierId: string) { }
}

@eventType('a1ecf083-d5a3-4556-8df2-82f96ca8c900')
export class SupplierDeleted {
    constructor(readonly SupplierId: string) { }
}

@eventType('f9755282-faa3-4a1c-8a92-5224540ab321')
export class SupplierUpdated {
    constructor(readonly SupplierId: string) { }
}

////////////
@eventType('faddfa44-124d-4354-b60d-b41997319c8f')
export class ItemCreated {
    constructor(readonly ItemId: string) { }
}

@eventType('2c2befbc-dfa4-4d18-b5a6-96fcc9f85b00')
export class ItemDeleted {
    constructor(readonly ItemId: string) { }
}

@eventType('02df3d40-7043-4e44-a062-cb5de62587de')
export class ItemUpdated {
    constructor(readonly ItemId: string) { }
}

////////////
@eventType('5d4d0436-6734-4cba-bd4f-dcf3c28a3789')
export class SupplierItemCreated {
    constructor(readonly SupplierItemId: string) { }
}

@eventType('c08262ff-d7bd-4012-bf40-1ae00611cd9c')
export class SupplierItemDeleted {
    constructor(readonly SupplierItemId: string) { }
}

@eventType('1cdec1e6-520d-4c8a-93aa-b42e83a9949a')
export class SupplierItemUpdated {
    constructor(readonly SupplierItemId: string) { }
}

////////////
@eventType('668660e8-8740-40b5-a8da-25d1fd5dff2f')
export class PurchaseOrderItemNameCreated {
    constructor(readonly ItemName: string) { }
}

@eventType('d7fc01a3-f031-4732-8ba6-4db0f98b1dea')
export class PurchaseOrderItemNameDeleted {
    constructor(readonly ItemName: string) { }
}

@eventType('40717c50-fa8d-4d6a-9ff5-51a19715452c')
export class PurchaseOrderItemNameUpdated {
    constructor(readonly ItemName: string) { }
}

////////////
@eventType('6ff5abb8-0cac-42fe-bc93-b20dd523afe9')
export class PurchaseOrderItemDescriptionCreated {
    constructor(readonly ItemDescription: string) { }
}

@eventType('5c6b3861-1ca1-468b-94e7-c11cede64350')
export class PurchaseOrderItemDescriptionDeleted {
    constructor(readonly ItemDescription: string) { }
}

@eventType('be9b48ed-9898-4670-8899-0bc0a1631e8b')
export class PurchaseOrderItemDescriptionUpdated {
    constructor(readonly ItemDescription: string) { }
}

////////////
@eventType('4253919d-4094-4bbb-992f-29fdec664449')
export class SupplierOrderCreated {
    constructor(readonly SupplierOrderId: string) { }
}

@eventType('8d3e58cf-955d-4c92-837f-329617ba3338')
export class SupplierOrderDeleted {
    constructor(readonly SupplierOrderId: string) { }
}

@eventType('13c1926a-d015-40eb-8182-9a2f10737fae')
export class SupplierOrderUpdated {
    constructor(readonly SupplierOrderId: string) { }
}

////////////
@eventType('c3aa6144-f741-4ef4-98f3-4b5371db2fa6')
export class PurchasePriceCreated {
    constructor(readonly Price: number) { }
}

@eventType('f0d8962f-978b-4b92-a8a2-6b848dc063ff')
export class PurchasePriceDeleted {
    constructor(readonly Price: number) { }
}

@eventType('66d0c57c-6090-4078-8730-11000f3f6b63')
export class PurchasePriceUpdated {
    constructor(readonly Price: number) { }
}

////////////
@eventType('d00da6ce-345d-471e-8990-7a795936c448')
export class ConfirmedPurchasePriceCreated {
    constructor(readonly ConfirmedPrice: number) { }
}

@eventType('b416ba61-09de-4c16-8efe-e9b4008e3858')
export class ConfirmedPurchasePriceDeleted {
    constructor(readonly ConfirmedPrice: number) { }
}

@eventType('1eddaa9c-b345-44f3-a4b5-5c315a141eb1')
export class ConfirmedPurchasePriceUpdated {
    constructor(readonly ConfirmedPrice: number) { }
}

////////////
@eventType('65ef8287-4d28-45ff-8c83-f4c82a931861')
export class PurchaseOrderUnitOfMeasureCreated {
    constructor(readonly OrderUnitofMeasure: string) { }
}

@eventType('a7b75e98-3a61-4481-a736-9ffe55d1a56c')
export class PurchaseOrderUnitOfMeasureDeleted {
    constructor(readonly OrderUnitofMeasure: string) { }
}

@eventType('5de5f2c3-8d10-431e-9043-8ee9676104fd')
export class PurchaseOrderUnitOfMeasureUpdated {
    constructor(readonly OrderUnitofMeasure: string) { }
}

////////////
@eventType('b17ba039-c09b-4acd-909b-7aa704c8a8cc')
export class PurchasePriceUnitOfMeasureCreated {
    constructor(readonly PriceUnitofMeasure: string) { }
}

@eventType('d09f4138-b447-4e95-a703-9dc212fcddcf')
export class PurchasePriceUnitOfMeasureDeleted {
    constructor(readonly PriceUnitofMeasure: string) { }
}

@eventType('e3a1fdd6-14c9-4507-8812-dbbcbbf3ef89')
export class PurchasePriceUnitOfMeasureUpdated {
    constructor(readonly PriceUnitofMeasure: string) { }
}

////////////
@eventType('d456877a-042d-4364-8490-f6db9e4bd9f2')
export class PurchasePriceQuantityCreated {
    constructor(readonly PriceQuantity: number) { }
}

@eventType('5c1d870f-a595-43c2-a154-14b55f54c827')
export class PurchasePriceQuantityDeleted {
    constructor(readonly PriceQuantity: number) { }
}

@eventType('b1db066c-5e41-400d-a41f-1fcb23ec66c5')
export class PurchasePriceQuantityUpdated {
    constructor(readonly PriceQuantity: number) { }
}

////////////
@eventType('1d8a5f84-d4d6-4328-bb32-c23843e9cadd')
export class ConfirmedPurchasePriceQuantityCreated {
    constructor(readonly ConfirmedPriceQuantity: number) { }
}

@eventType('277e9156-3ef3-4a23-95d2-eb2f330a58ed')
export class ConfirmedPurchasePriceQuantityDeleted {
    constructor(readonly ConfirmedPriceQuantity: number) { }
}

@eventType('1548b0c2-663f-4d47-8448-f885655a866e')
export class ConfirmedPurchasePriceQuantityUpdated {
    constructor(readonly ConfirmedPriceQuantity: number) { }
}

////////////
@eventType('77d58b9e-a798-494c-8a38-0dba3d51e51f')
export class PurchasePriceTextCreated {
    constructor(readonly PriceText: number) { }
}

@eventType('7c68b6ff-b94c-4e6a-8d01-9784ae16ae64')
export class PurchasePriceTextDeleted {
    constructor(readonly PriceText: number) { }
}

@eventType('0de048ef-2fbe-4a3f-bcea-c4b74962c28c')
export class PurchasePriceTextUpdated {
    constructor(readonly PriceText: number) { }
}

////////////
@eventType('61178632-090f-4831-a7fe-e5eb50d423df')
export class LineAmountOrderCurrencyCreated {
    constructor(readonly Currency: number) { }
}

@eventType('4a037e60-e898-4842-a0f3-886e07c01158')
export class LineAmountOrderCurrencyDeleted {
    constructor(readonly Currency: number) { }
}

@eventType('e958a88a-4438-4bf1-8fc6-6507f61c08d5')
export class LineAmountOrderCurrencyUpdated {
    constructor(readonly Currency: number) { }
}

////////////
@eventType('9642efe0-cce4-4a92-ac96-5e9a8f55f850')
export class RequestedDeliveryDateCreated {
    constructor(readonly RequestedDate: number) { }
}

@eventType('91ac1d35-2f8d-4f86-989c-3ae8c28559cd')
export class RequestedDeliveryDateDeleted {
    constructor(readonly RequestedDate: number) { }
}

@eventType('909ac72e-406e-4921-b60b-917e329c8268')
export class RequestedDeliveryDateUpdated {
    constructor(readonly RequestedDate: number) { }
}

////////////
@eventType('b1d0c1bf-3c2b-4537-b1d8-9ee5168b33ab')
export class ConfirmedDeliveryDateCreated {
    constructor(readonly ConfirmedDate: number) { }
}

@eventType('774e48cd-af27-4d8c-bab2-ba1b7fc0cc1c')
export class ConfirmedDeliveryDateDeleted {
    constructor(readonly ConfirmedDate: number) { }
}

@eventType('169811e1-6a1b-4364-b788-84aca34da3c2')
export class ConfirmedDeliveryDateUpdated {
    constructor(readonly ConfirmedDate: number) { }
}

////////////
@eventType('08c00774-e2d4-4dcc-b532-78a2e84b4077')
export class OrderedQuantityAlternateUnitOfMeasureCreated {
    constructor(readonly OrderedQuantityUnitOfMeasure: number) { }
}

@eventType('8bb1502e-1830-4bb6-bfcc-49afb1d6e5ea')
export class OrderedQuantityAlternateUnitOfMeasureDeleted {
    constructor(readonly OrderedQuantityUnitOfMeasure: number) { }
}

@eventType('7c24ec83-88f1-4c2b-b370-716eabba2076')
export class OrderedQuantityAlternateUnitOfMeasureUpdated {
    constructor(readonly OrderedQuantityUnitOfMeasure: number) { }
}

////////////
@eventType('03d5adec-416f-40d9-be68-e9e8341edad0')
export class ConfirmedQuantityCreated {
    constructor(readonly ConfirmedQuantity: number) { }
}

@eventType('8d4f35b2-60cc-4160-bf86-c5aa494be50a')
export class ConfirmedQuantityDeleted {
    constructor(readonly ConfirmedQuantity: number) { }
}

@eventType('05ba981f-cd77-44ab-96b2-c9ae96c4c679')
export class ConfirmedQuantityUpdated {
    constructor(readonly ConfirmedQuantity: number) { }
}

////////////
@eventType('b81ab15a-5a95-404e-bdf0-34e8d831c40d')
export class DeliveryMethodCreated {
    constructor(readonly Method: string) { }
}

@eventType('87a3b903-f515-4322-aa48-aa97e0cd67f9')
export class DeliveryMethodDeleted {
    constructor(readonly Method: string) { }
}

@eventType('0e059c50-3c66-4183-9116-802434f92743')
export class DeliveryMethodUpdated {
    constructor(readonly Method: string) { }
}

////////////
@eventType('b95ca116-becc-42d8-9a8e-7507aa8e6205')
export class DeliveryTermsCreated {
    constructor(readonly Terms: string) { }
}

@eventType('b05e23a0-d52a-416a-a67a-46e52ca9849d')
export class DeliveryTermsDeleted {
    constructor(readonly Terms: string) { }
}

@eventType('2eb89073-4b8f-4985-88ff-89b718e8a80a')
export class DeliveryTermsUpdated {
    constructor(readonly Terms: string) { }
}

////////////
//HEAD
@eventType('66f7800d-1a8a-402e-8516-bfa547adf034')
export class OrderDateCreated {
    constructor(readonly OrderDate: number) { }
}

@eventType('1fc52080-23d2-4ca9-8577-19f8195d26f8')
export class OrderDateDeleted {
    constructor(readonly OrderDate: number) { }
}

@eventType('f08c3984-bc19-4329-9465-34bde48c7890')
export class OrderDateUpdated {
    constructor(readonly OrderDate: number) { }
}

////////////
@eventType('1c6b5f73-5be1-48c8-8078-6a4352805da1')
export class PaymentTermsCreated {
    constructor(readonly PaymentTerms: string) { }
}

@eventType('9e47a6ab-136a-4f7f-88b8-16dc44bbf14c')
export class PaymentTermsDeleted {
    constructor(readonly PaymentTerms: string) { }
}

@eventType('39d112db-672b-4d80-9533-ad4671beab6d')
export class PaymentTermsUpdated {
    constructor(readonly PaymentTerms: string) { }
}

////////////
@eventType('98289f18-b3f6-43ca-aeaa-0ae90e13e167')
export class ReferenceCreated {
    constructor(readonly Reference: string) { }
}

@eventType('63a096c7-580c-4c38-a576-ba668ab99119')
export class ReferenceDeleted {
    constructor(readonly Reference: string) { }
}

@eventType('e6440f69-1a0e-4570-829a-a34991da5743')
export class ReferenceUpdated {
    constructor(readonly Reference: string) { }
}

////////////
@eventType('7c9f1eb2-b2bf-4a23-839c-07ae25c7268f')
export class SupplierReferenceCreated {
    constructor(readonly SupplierReference: string) { }
}

@eventType('5af600bf-f41f-442b-87ab-825c2b7ce7cc')
export class SupplierReferenceDeleted {
    constructor(readonly SupplierReference: string) { }
}

@eventType('ef725092-5e2e-41fe-964f-daada254b294')
export class SupplierReferenceUpdated {
    constructor(readonly SupplierReference: string) { }
}

////////////
@eventType('ce81cd99-c6f2-4ef0-aa00-11471f0a104c')
export class OurReferenceNumberCreated {
    constructor(readonly InternalReference: string) { }
}

@eventType('fee90be9-c42f-438f-8ee9-d87446654dac')
export class OurReferenceNumberDeleted {
    constructor(readonly InternalReference: string) { }
}

@eventType('8b16248a-e717-4429-b990-dc772c0abfba')
export class OurReferenceNumberUpdated {
    constructor(readonly InternalReference: string) { }
}

////////////
@eventType('8020529f-4b42-46cc-82cd-4b0b11c31715')
export class NetOrderValueCreated {
    constructor(readonly OrderValueNet: number) { }
}

@eventType('12fe085f-8f0b-4c16-85b5-173755bd8c13')
export class NetOrderValueDeleted {
    constructor(readonly OrderValueNet: number) { }
}

@eventType('8036ec2b-2b79-44c7-a628-45ce3afa808b')
export class NetOrderValueUpdated {
    constructor(readonly OrderValueNet: number) { }
}

////////////
@eventType('296dcb1d-e98a-4d13-b1b4-949ef1af6e77')
export class NumberOfPurchaseOrderLinesCreated {
    constructor(readonly AmountPurchaseOrderLines: number) { }
}

@eventType('4dac676f-9c9e-4b38-9c85-470af4dd2c19')
export class NumberOfPurchaseOrderLinesDeleted {
    constructor(readonly AmountPurchaseOrderLines: number) { }
}

@eventType('6692b5d8-9ccf-4be8-a227-f4fe1b9c4a1b')
export class NumberOfPurchaseOrderLinesUpdated {
    constructor(readonly AmountPurchaseOrderLines: number) { }
}

////////////
@eventType('c2d609de-851a-4265-9fc1-eb3756222423')
export class TotalOrderCostCreated {
    constructor(readonly TotalCost: number) { }
}

@eventType('bb6bfb94-352a-4e35-8c89-504fd8964c40')
export class TotalOrderCostDeleted {
    constructor(readonly TotalCost: number) { }
}

@eventType('477a05db-b5a2-4e3f-8d23-57b3546ca055')
export class TotalOrderCostUpdated {
    constructor(readonly TotalCost: number) { }
}

////////////
@eventType('cd70a98c-c4a5-479f-9b5e-92721d5feb73')
export class TotalQuantityCreated {
    constructor(readonly TotalQuantity: number) { }
}

@eventType('718bb6fa-0681-47a4-9f2f-72f15f1eb321')
export class TotalQuantityDeleted {
    constructor(readonly TotalQuantity: number) { }
}

@eventType('c4259df4-a7cc-4b25-bc60-94794f874bff')
export class TotalQuantityUpdated {
    constructor(readonly TotalQuantity: number) { }
}

////////////
@eventType('be4b2101-6a0a-44af-b148-cf102d339f5a')
export class OurInvoicingAddressCreated {
    constructor(readonly InvoiceAddress: string) { }
}

@eventType('daea2c53-ce86-4b8f-a4b5-a6e1cd2b90d3')
export class OurInvoicingAddressDeleted {
    constructor(readonly InvoiceAddress: string) { }
}

@eventType('b495cc26-4c2c-4bb2-b2bd-a10542bd8929')
export class OurInvoicingAddressUpdated {
    constructor(readonly InvoiceAddress: string) { }
}

////////////
