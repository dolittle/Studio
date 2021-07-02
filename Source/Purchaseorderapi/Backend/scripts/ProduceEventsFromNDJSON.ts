// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import fs from 'fs';
import readline from 'readline';
import yargs from 'yargs/yargs';
import { EventProducer } from '../eventsproducer';
import { Client } from '@dolittle/sdk';
import { TenantId } from '@dolittle/sdk.execution';
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
} from '../events/PurchaseOrderEvents';
import { isReturnStatement } from 'typescript';
import { PurchaseOrderAndOrderLineHandler } from '../PurchaseOrdersAndOrderLinesHandler';

interface ScriptArgs {
    inputFile: string;
    commitToRuntime: boolean;
}

const argv = <ScriptArgs>yargs(process.argv.slice(2)).options({
    inputFile: {
        type: 'string',
        demandOption: true,
        description: 'NDJSON file to produce events from',
    },
    commitToRuntime: { type: 'boolean', description: 'true if you want to produce events in Runtime' }
}).argv;

const inputFileReadStream = fs.createReadStream(argv.inputFile);
const rl = readline.createInterface(inputFileReadStream);
const eventProducer = new EventProducer();

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
    }).build();

let counter = 0;
const eventsToProduce: any[] = [];
rl.on('line', (line) => {
    const data = JSON.parse(line);
    const events = eventProducer.produce(data.payload);

    if (argv.commitToRuntime) {
        // only support MPHEAD so far
        if (data.part !== 'MPHEAD') {
            return;
        }

        for (const e of events) {
            eventsToProduce.push(e);
        }
    } else {
        console.log(`${data.payload.document} (${counter}): ${data.payload.operation}`, events);
    }

    counter += 1;
});

rl.on('close', async () => {
    for (const event of eventsToProduce) {
        console.log(event);
        await client.eventStore
            .forTenant(TenantId.development)
            .commit(event, '3b9dfbaf-8592-46ab-95f0-7845926b2c23');
    }
    //console.log(eventsToProduce);
});
