// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Client } from '@dolittle/sdk';
import {
    PurchaseOrderChangedNumberChanged,
    PurchaseOrderCreated,
    PurchaseOrderDateChanged,
    PurchaseOrderDeleted,
    PurchaseOrderDeliveryMethodChanged,
    PurchaseOrderDeliveryTerms,
    PurchaseOrderFacilityNumberChanged,
    PurchaseOrderHighestStatusChanged,
    PurchaseOrderInternalReferenceChanged,
    PurchaseOrderLowestStatusChanged,
    PurchaseOrderNetOrderValueChanged,
    PurchaseOrderNumberOfPurchaseOrderLinesChanged,
    PurchaseOrderOurInvoicingAddressChanged,
    PurchaseOrderPaymentTermsChanged,
    PurchaseOrderReferenceChanged,
    PurchaseOrderRequestedDateChanged,
    PurchaseOrderSupplierIdChanged,
    PurchaseOrderSupplierReferenceChanged,
    PurchaseOrderTotalOrderCostChanged,
    PurchaseOrderTotalQuantityChanged
} from './events/PurchaseOrderEvents';
import {
    PurchaseOrderLineHighestStatusUpdated,
    PurchaseOrderLineLowestStatusUpdated,
    PurchaseOrderLineChangeNumberUpdated,
    PurchaseOrderLineCreated,
    PurchaseOrderLineDeleted,
    PurchaseOrderLineSubNumberUpdated
} from './events/PurchaseOrderLineEvents';
import { PurchaseOrdersHandler } from './PurchaseOrdersHandler';
import { PurchaseOrdersLinesHandler } from './PurchaseOrdersLinesHandler';

const client = Client
    .forMicroservice('f2586326-1057-495b-a12b-7f45193b9402')
    .withEventTypes(eventTypes => {
        eventTypes.register(PurchaseOrderCreated);
        eventTypes.register(PurchaseOrderDeleted);
        eventTypes.register(PurchaseOrderFacilityNumberChanged);
        eventTypes.register(PurchaseOrderLowestStatusChanged);
        eventTypes.register(PurchaseOrderHighestStatusChanged);
        eventTypes.register(PurchaseOrderSupplierIdChanged);
        eventTypes.register(PurchaseOrderDeliveryMethodChanged);
        eventTypes.register(PurchaseOrderReferenceChanged);
        eventTypes.register(PurchaseOrderSupplierReferenceChanged);
        eventTypes.register(PurchaseOrderRequestedDateChanged);
        eventTypes.register(PurchaseOrderInternalReferenceChanged);
        eventTypes.register(PurchaseOrderNetOrderValueChanged);
        eventTypes.register(PurchaseOrderNumberOfPurchaseOrderLinesChanged);
        eventTypes.register(PurchaseOrderTotalOrderCostChanged);
        eventTypes.register(PurchaseOrderTotalQuantityChanged);
        eventTypes.register(PurchaseOrderOurInvoicingAddressChanged);
        eventTypes.register(PurchaseOrderDeliveryTerms);
        eventTypes.register(PurchaseOrderPaymentTermsChanged);
        eventTypes.register(PurchaseOrderDateChanged);
        eventTypes.register(PurchaseOrderChangedNumberChanged);

        eventTypes.register(PurchaseOrderLineCreated);
        eventTypes.register(PurchaseOrderLineSubNumberUpdated);
        eventTypes.register(PurchaseOrderLineChangeNumberUpdated);
        eventTypes.register(PurchaseOrderLineHighestStatusUpdated);
        eventTypes.register(PurchaseOrderLineLowestStatusUpdated);
        eventTypes.register(PurchaseOrderLineDeleted);
    })
    .withEventHandlers(builder => {
        builder.register(PurchaseOrdersHandler);
        builder.register(PurchaseOrdersLinesHandler);
    })
    .build();
