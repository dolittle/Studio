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
    PurchaseOrderSupplierReferenceChanged
} from './events/PurchaseOrderEvents';
import { PurchaseOrderModel } from './purchaseorder/PurchaseOrder';
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
        }
        po.facilityNumber = parseInt(event.FacilityNumber);
        await po.save();
    }

    @handles(PurchaseOrderDeleted)
    purchaseOrderDeleted(event: PurchaseOrderDeleted, eventContext: EventContext) {
        //console.log('PO deleted');
    }

    @handles(PurchaseOrderFacilityNumberChanged)
    async purchaseOrderFacilityNumberChanged(event: PurchaseOrderFacilityNumberChanged, eventContext: EventContext) {
        //console.log('PurchaseOrderFacilityNumberChanged');
    }

    @handles(PurchaseOrderLowestStatusChanged)
    async purchaseOrderLowestStatusChanged(event: PurchaseOrderLowestStatusChanged, eventContext: EventContext) {
        //console.log('PurchaseOrderLowestStatusChanged');
        const po = await PurchaseOrderModel.findOne({ orderNumber: event.PurchaseOrderNumber }).exec();
        if (po) {
            po.lowestStatus = event.LowestStatus;
            po.save();
        }
    }

    @handles(PurchaseOrderHighestStatusChanged)
    async purchaseOrderHighestStatusChanged(event: PurchaseOrderHighestStatusChanged, eventContext: EventContext) {
        //console.log('PurchaseOrderHighestStatusChanged');
        const po = await PurchaseOrderModel.findOne({ orderNumber: event.PurchaseOrderNumber }).exec();
        if (po) {
            po.highestStatus = event.HighestStatus;
            po.save();
        }
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
    }

    @handles(PurchaseOrderRequestedDateChanged)
    purchaseOrderRequestedDateChanged(event: PurchaseOrderRequestedDateChanged, eventContext: EventContext) {
        //console.log('PurchaseOrderRequestedDateChanged');
    }

    @handles(PurchaseOrderChangedNumberChanged)
    async purchaseOrderChangedNumberChanged(event: PurchaseOrderChangedNumberChanged, eventContext: EventContext) {
        //console.log('PurchaseOrderChangedNumberChanged');
        const po = await PurchaseOrderModel.findOne({ orderNumber: event.PurchaseOrderNumber }).exec();
        if (po) {
            po.changeNumber = event.ChangeNumber;
            po.save();
        }
    }
}
