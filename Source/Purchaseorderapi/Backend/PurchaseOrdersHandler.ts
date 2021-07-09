// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventContext } from '@dolittle/sdk.events';
import { eventHandler, handles } from '@dolittle/sdk.events.handling';
import {
    PurchaseOrderChangedNumberChanged,
    PurchaseOrderCreated,
    PurchaseOrderDeleted,
    PurchaseOrderDeliveryMethodChanged,
    PurchaseOrderFacilityNumberChanged,
    PurchaseOrderHighestStatusChanged,
    PurchaseOrderLowestStatusChanged,
    PurchaseOrderReferenceChanged,
    PurchaseOrderRequestedDateChanged,
    PurchaseOrderSupplierIdChanged,
    PurchaseOrderSupplierReferenceChanged,
    PurchaseOrderTotalQuantityChanged,
    PurchaseOrderTotalOrderCostChanged,
    PurchaseOrderNumberOfPurchaseOrderLinesChanged,
    PurchaseOrderNetOrderValueChanged,
    PurchaseOrderDateChanged
} from './events/PurchaseOrderEvents';
import { PurchaseOrderModel, PurchaseOrder } from './purchaseorder/PurchaseOrder';
import { mongoose } from '@typegoose/typegoose';


@eventHandler('c60eb009-7988-4e2a-9fee-c8a36032291a')
export class PurchaseOrdersHandler {

    constructor() {
    }

    @handles(PurchaseOrderCreated)
    async purchaseOrderCreated(event: PurchaseOrderCreated, eventContext: EventContext) {
        await mongoose.connect('mongodb://localhost:27017', { dbName: 'PurchaseOrdersReadModel' });

        //console.log('PO', event);

        let po = await PurchaseOrderModel.findOne({ orderNumber: event.PurchaseOrderNumber }).exec();
        if (!po) {
            po = new PurchaseOrderModel();
            po.orderNumber = event.PurchaseOrderNumber;
            po.reference = event.Reference;
            po.supplierReference = event.SupplierReference;
            po.supplierId = event.SupplierID;
            po.orderDate = event.OrderDate;
            po.requestedOrderDate = event.RequestedDate;
            po.lowestStatus = event.LowestStatus;
            po.highestStatus = event.HighestStatus;
        }
        po.facilityNumber = parseInt(event.FacilityNumber);
        await po.save();
    }

    @handles(PurchaseOrderDeleted)
    async purchaseOrderDeleted(event: PurchaseOrderDeleted, eventContext: EventContext) {
        //console.log('PO deleted');

        const filter = { orderNumber: event.PurchaseOrderNumber };
        const result = await PurchaseOrderModel.deleteOne(filter, (err) => {
            if (err) {
                console.log(err);
            }
        });
        console.log(result);

    }

    @handles(PurchaseOrderDateChanged)
    async purchaseOrderDateChanged(event: PurchaseOrderDateChanged, eventContext: EventContext) {
        updatePurchaseOrder(event.PurchaseOrderNumber, po => {
            po.orderDate = event.OrderDate;
        });
    }

    @handles(PurchaseOrderFacilityNumberChanged)
    async purchaseOrderFacilityNumberChanged(event: PurchaseOrderFacilityNumberChanged, eventContext: EventContext) {
        //console.log('PurchaseOrderFacilityNumberChanged');
    }

    @handles(PurchaseOrderLowestStatusChanged)
    async purchaseOrderLowestStatusChanged(event: PurchaseOrderLowestStatusChanged, eventContext: EventContext) {
        //console.log('PurchaseOrderLowestStatusChanged');

        updatePurchaseOrder(event.PurchaseOrderNumber, po => {
            po.lowestStatus = event.LowestStatus;
        });
    }

    @handles(PurchaseOrderHighestStatusChanged)
    async purchaseOrderHighestStatusChanged(event: PurchaseOrderHighestStatusChanged, eventContext: EventContext) {
        //console.log('PurchaseOrderHighestStatusChanged');
        updatePurchaseOrder(event.PurchaseOrderNumber, po => {
            po.highestStatus = event.HighestStatus;
        });
    }

    @handles(PurchaseOrderSupplierIdChanged)
    purchaseOrderSupplierIdChanged(event: PurchaseOrderSupplierIdChanged, eventContext: EventContext) {
        //console.log('PurchaseOrderSupplierIdChanged');
    }

    @handles(PurchaseOrderDeliveryMethodChanged)
    purchaseOrderDeliveryMethodChanged(event: PurchaseOrderDeliveryMethodChanged, eventContext: EventContext) {
        //console.log('PurchaseOrderDeliveryMethodChanged');
    }

    @handles(PurchaseOrderReferenceChanged)
    purchaseOrderReferenceChanged(event: PurchaseOrderReferenceChanged, eventContext: EventContext) {
        //console.log('PurchaseOrderReferenceChanged');
    }

    @handles(PurchaseOrderSupplierReferenceChanged)
    purchaseOrderSupplierReferenceChanged(event: PurchaseOrderSupplierReferenceChanged, eventContext: EventContext) {
        //console.log('PurchaseOrderSupplierReferenceChanged');

        updatePurchaseOrder(event.PurchaseOrderNumber, po => {
            po.supplierReference = event.SupplierReference;
        });
    }

    @handles(PurchaseOrderRequestedDateChanged)
    purchaseOrderRequestedDateChanged(event: PurchaseOrderRequestedDateChanged, eventContext: EventContext) {
        //console.log('PurchaseOrderRequestedDateChanged');

        updatePurchaseOrder(event.PurchaseOrderNumber, po => {
            po.requestedOrderDate = event.RequestedDate;
        });
    }

    @handles(PurchaseOrderChangedNumberChanged)
    async purchaseOrderChangedNumberChanged(event: PurchaseOrderChangedNumberChanged, eventContext: EventContext) {
        //console.log('PurchaseOrderChangedNumberChanged');

        updatePurchaseOrder(event.PurchaseOrderNumber, po => {
            po.changeNumber = event.ChangeNumber;
        });
    }

    @handles(PurchaseOrderTotalQuantityChanged)
    async purchaseOrderTotalQuantityChanged(event: PurchaseOrderTotalQuantityChanged, eventContext: EventContext) {
        updatePurchaseOrder(event.PurchaseOrderNumber, po => {
            po.totalQuantity = event.TotalQuantity;
        });
    }

    @handles(PurchaseOrderTotalOrderCostChanged)
    async purchaseOrderTotalOrderCostChanged(event: PurchaseOrderTotalOrderCostChanged, eventContext: EventContext) {
        updatePurchaseOrder(event.PurchaseOrderNumber, po => {
            po.totalCost = event.TotalCost;
        });
    }

    @handles(PurchaseOrderNumberOfPurchaseOrderLinesChanged)
    async purchaseOrderNumberOfPurchaseOrderLinesChanged(event: PurchaseOrderNumberOfPurchaseOrderLinesChanged, eventContext: EventContext) {
        updatePurchaseOrder(event.PurchaseOrderNumber, po => {
            po.numberOfOrderLines = event.AmountPurchaseOrderLines;
        });
    }

    @handles(PurchaseOrderNetOrderValueChanged)
    async purchaseOrderNetOrderValueChanged(event: PurchaseOrderNetOrderValueChanged, eventContext: EventContext) {
        updatePurchaseOrder(event.PurchaseOrderNumber, po => {
            po.orderValueNet = event.OrderValueNet;
        });
    }
}

async function updatePurchaseOrder(orderNumber: string, updateCallback: (po: any) => void) {
    const po = await PurchaseOrderModel.findOne({ orderNumber }).exec();
    if (po) {
        updateCallback(po);
        po.save();
    }
}
