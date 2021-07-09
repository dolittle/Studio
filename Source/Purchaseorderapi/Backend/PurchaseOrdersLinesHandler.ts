// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventContext } from '@dolittle/sdk.events';
import { eventHandler, handles } from '@dolittle/sdk.events.handling';
import { mongoose } from '@typegoose/typegoose';
import {
    PurchaseOrderLineCreated,
    PurchaseOrderLineDeleted,
    PurchaseOrderLineHighestStatusUpdated,
    PurchaseOrderLineSubNumberUpdated,
    PurchaseOrderLineLowestStatusUpdated,
    PurchaseOrderLineDifferentDeliveryAddressUpdated,
    PurchaseOrderLineSupplierUpdated,
    PurchaseOrderLineItemNumberUpdated,
    PurchaseOrderLineSupplierItemIdUpdated,
    PurchaseOrderLineItemNameUpdated,
    PurchaseOrderLineItemDescriptionUpdated,
    PurchaseOrderLineSupplierOrderIdUpdated,
    PurchaseOrderLinePriceUpdated,
    PurchaseOrderLineConfirmedPriceUpdated,
    PurchaseOrderLinePriceUnitOfMeasureUpdated,
    PurchaseOrderLinePriceQuantityUpdated,
    PurchaseOrderLinePriceTextUpdated,
    PurchaseOrderLineCurrencyUpdated,
    PurchaseOrderLineRequestedDateUpdated,
    PurchaseOrderLineConfirmedDateUpdated
} from './events/PurchaseOrderLineEvents';
import { PurchaseOrderModel, PurchaseOrderLine } from './purchaseorder/PurchaseOrder';
import { PurchaseOrderLowestStatusChanged } from './events/PurchaseOrderEvents';
import { isReturnStatement, PostfixUnaryOperator } from 'typescript';
import { string } from 'yargs';

@eventHandler('86afb1b1-ed74-4c71-9b67-a3157b1f98da')
export class PurchaseOrdersLinesHandler {

    @handles(PurchaseOrderLineCreated)
    async purchaseOrderLineCreated(event: PurchaseOrderLineCreated, eventContext: EventContext) {
        await mongoose.connect('mongodb://localhost:27017', { dbName: 'PurchaseOrdersReadModel' });

        //console.log('PO LINE CREATED');

        let po = await PurchaseOrderModel.findOne({ orderNumber: event.PurchaseOrderNumber }).exec();
        if (po) {
            // Don't add if line number exists
            let lineExists = false;

            for (const x of po.lines) {
                if (x.lineNumber === event.LineNumber) {
                    lineExists = true;
                    break;
                }
            }

            if (!lineExists) {
                const line = new PurchaseOrderLine();
                line.lineNumber = event.LineNumber;
                line.subLineNumber = event.SubLineNumber;
                line.itemNumber = event.ItemNumber;
                line.itemName = event.ItemName;
                line.supplierId = event.SupplierId;
                line.diferentDeliveryAdress = event.DiferentDeliveryAdress;
                po.lines.push(line);
                po.save();
            }
        }
    }

    @handles(PurchaseOrderLineDeleted)
    async purchaseOrderLineDelete(event: PurchaseOrderLineDeleted, eventContext: EventContext) {
        //console.log('PO LINE DELETED');

        let po = await PurchaseOrderModel.findOne({ orderNumber: event.PurchaseOrderNumber }).exec();
        if (po) {
            let indexToRemove = -1;
            for (const x of po.lines) {
                if (x.lineNumber === event.LineNumber) {
                    indexToRemove = po.lines.indexOf(x);
                    break;
                }
            }

            if (indexToRemove > 0) {
                po.lines.splice(indexToRemove, 1);
                await po.save();
            }
        }
    }

    @handles(PurchaseOrderLineSubNumberUpdated)
    async purchaseOrderLineSubNumberUpdated(event: PurchaseOrderLineSubNumberUpdated, eventContext: EventContext) {
        //console.log('PO LINE SubNumber updated');

        const po = await PurchaseOrderModel.findOne({ orderNumber: event.PurchaseOrderNumber }).exec();
        if (po) {
            const poLine = po.findLine(event.LineNumber);
            if (poLine) {
                poLine.subLineNumber = event.SubLineNumber;
                await po.save();
            }
        }


    }

    @handles(PurchaseOrderLineHighestStatusUpdated)
    async purchaseOrderLineHighestStatusUpdated(event: PurchaseOrderLineHighestStatusUpdated, eventContext: EventContext) {
        //console.log('PO LINE HighestStatus updated');

        await updatePurchaseOrderLine(event.PurchaseOrderNumber, event.LineNumber, {
            highestStatus: event.HighestStatus
        });

    }

    @handles(PurchaseOrderLineLowestStatusUpdated)
    async purchaseOrderLineLowestStatusUpdated(event: PurchaseOrderLineLowestStatusUpdated, eventContext: EventContext) {
        //console.log('PO LINE LowestStatus updated');

        await updatePurchaseOrderLine(event.PurchaseOrderNumber, event.LineNumber, {
            lowestStatus: event.Status
        });
    }

    @handles(PurchaseOrderLineDifferentDeliveryAddressUpdated)
    async purchaseOrderLineDifferentDeliveryAddressUpdated(event: PurchaseOrderLineDifferentDeliveryAddressUpdated, eventContext: EventContext) {
        //console.log('PO LINE Different Delivery Adress updated');

        await updatePurchaseOrderLine(event.PurchaseOrderNumber, event.LineNumber, {
            differentDeliveryAddress: event.DifferentDeliveryAddress
        });
    }

    @handles(PurchaseOrderLineSupplierUpdated)
    async purchaseOrderLineSupplierUpdated(event: PurchaseOrderLineSupplierUpdated, eventContext: EventContext) {
        //console.log('PO LINE Supplier Updated');

        await updatePurchaseOrderLine(event.PurchaseOrderNumber, event.LineNumber, {
            supplierId: event.SupplierId
        });
    }

    @handles(PurchaseOrderLineItemNumberUpdated)
    async purchaseOrderLineItemNumberUpdated(event: PurchaseOrderLineItemNumberUpdated, eventContext: EventContext) {
        //console.log('PO LINE Item Updated');

        await updatePurchaseOrderLine(event.PurchaseOrderNumber, event.LineNumber, {
            itemNumber: event.itemNumber
        });
    }

    @handles(PurchaseOrderLineSupplierItemIdUpdated)
    async purchaseOrderLineSupplierItemIdUpdated(event: PurchaseOrderLineSupplierItemIdUpdated, eventContext: EventContext) {
        //console.log('PO LINE Supplier Item Id updated');

        await updatePurchaseOrderLine(event.PurchaseOrderNumber, event.LineNumber, {
            supplierItemId: event.SupplierItemId
        });
    }

    @handles(PurchaseOrderLineItemNameUpdated)
    async purchaseOrderLineItemNameUpdated(event: PurchaseOrderLineItemNameUpdated, eventContext: EventContext) {
        //console.log('PO LINE Item Name updated');

        await updatePurchaseOrderLine(event.PurchaseOrderNumber, event.LineNumber, {
            itemName: event.ItemName
        });
    }

    @handles(PurchaseOrderLineItemDescriptionUpdated)
    async purchaseOrderLineItemDescriptionUpdated(event: PurchaseOrderLineItemDescriptionUpdated, eventContext: EventContext) {
        console.log('PO LINE Item Description updated');
    }

    @handles(PurchaseOrderLineSupplierOrderIdUpdated)
    async purchaseOrderLineSupplierOrderIdUpdated(event: PurchaseOrderLineSupplierOrderIdUpdated, eventContext: EventContext) {
        console.log('PO LINE Supplier Order Id updated');
    }

    @handles(PurchaseOrderLinePriceUpdated)
    async purchaseOrderLinePriceUpdated(event: PurchaseOrderLinePriceUpdated, eventContext: EventContext) {
        console.log('PO LINE Price updated');
    }

    @handles(PurchaseOrderLineConfirmedPriceUpdated)
    async purchaseOrderLineConfirmedPriceUpdated(event: PurchaseOrderLineConfirmedPriceUpdated, eventContext: EventContext) {
        console.log('PO LINE Confirmed Price Updated');
    }

    @handles(PurchaseOrderLinePriceUnitOfMeasureUpdated)
    async purchaseOrderLinePriceUnitOfMeasureUpdated(event: PurchaseOrderLinePriceUnitOfMeasureUpdated, eventContext: EventContext) {
        console.log('PO Line Price unit of Measure updated');
    }

    @handles(PurchaseOrderLinePriceQuantityUpdated)
    async purchaseOrderLinePriceQuantityUpdated(event: PurchaseOrderLinePriceQuantityUpdated, eventContext: EventContext) {
        console.log('PO LINE PriceQuantity updated');
    }

    @handles(PurchaseOrderLinePriceTextUpdated)
    async purchaseOrderLinePriceTextUpdated(event: PurchaseOrderLinePriceTextUpdated, eventContext: EventContext) {
        console.log('PO LINE PriceText updated');
    }

    @handles(PurchaseOrderLineCurrencyUpdated)
    async purchaseOrderLineCurrencyUpdated(event: PurchaseOrderLineCurrencyUpdated, eventContext: EventContext) {
        console.log('PO LINE Currency updated');
    }

    @handles(PurchaseOrderLineRequestedDateUpdated)
    async purchaseOrderLineRequestedDateUpdated(event: PurchaseOrderLineRequestedDateUpdated, eventContext: EventContext) {
        console.log('PO LINE Request Date updated');
    }

    @handles(PurchaseOrderLineConfirmedDateUpdated)
    async purchaseOrderLineConfirmedDateUpdated(event: PurchaseOrderLineConfirmedDateUpdated, eventContext: EventContext) {
        console.log('PO Line Confirmed Date updated');
    }
}

async function updatePurchaseOrderLine(poNumber: number, lineNumber: number, part: any) {
    const filter = { 'orderNumber': poNumber, 'lines.lineNumber': lineNumber };
    const doc = {};
    for (const p in part) {
        doc[`lines.$.${p}`] = part[p];
    }

    const result = await PurchaseOrderModel.update(filter, doc, (err) => {
        if (err) {
            console.log(err);
        }
    });

    // for debugging
    //console.log('Matched docs', result.n);
    //console.log('Modified docs', result.nModified);
}
