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
    PurchaseOrderLineLowestStatusUpdated
} from './events/PurchaseOrderLineEvents';
import { PurchaseOrderModel, PurchaseOrderLine } from './purchaseorder/PurchaseOrder';

@eventHandler('86afb1b1-ed74-4c71-9b67-a3157b1f98da')
export class PurchaseOrdersLinesHandler {

    @handles(PurchaseOrderLineCreated)
    async purchaseOrderLineCreated(event: PurchaseOrderLineCreated, eventContext: EventContext) {
        await mongoose.connect('mongodb://localhost:27017', { dbName: 'PurchaseOrdersReadModel' });

        console.log('PO LINE CREATED');

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
                po.lines.push(line);
                po.save();
            }
        }
    }

    @handles(PurchaseOrderLineDeleted)
    async purchaseOrderLineDelete(event: PurchaseOrderLineDeleted, eventContext: EventContext) {
        console.log('PO LINE DELETED');

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
                po.save();
            }
        }
    }

    @handles(PurchaseOrderLineSubNumberUpdated)
    async purchaseOrderLineSubNumberUpdated(event: PurchaseOrderLineSubNumberUpdated, eventContext: EventContext) {
        console.log('PO LINE SubNumber updated');
    }

    @handles(PurchaseOrderLineHighestStatusUpdated)
    async purchaseOrderLineHighestStatusUpdated(event: PurchaseOrderLineHighestStatusUpdated, eventContext: EventContext) {
        console.log('PO LINE HighestStatus updated');

        let po = await PurchaseOrderModel.findOne({ orderNumber: event.PurchaseOrderNumber }).exec();
        if (po) {
            for (const x of po.lines) {
                if (x.lineNumber === event.LineNumber) {
                    x.highestStatus = event.HighestStatus;
                    po.save();
                    break;
                }
            }
        }
    }

    @handles(PurchaseOrderLineLowestStatusUpdated)
    async purchaseOrderLineLowestStatusUpdated(event: PurchaseOrderLineLowestStatusUpdated, eventContext: EventContext) {
        console.log('PO LINE LowestStatus udpated');
    }

}
