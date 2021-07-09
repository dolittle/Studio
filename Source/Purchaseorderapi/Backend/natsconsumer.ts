// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { connect } from 'node-nats-streaming';
import { EventProducer } from './eventsproducer';
import { buildProducerClient } from './dolittleclient';
import { TenantId } from '@dolittle/sdk.execution';

const eventProducer = new EventProducer();
export type RawMomentMetadata = {
    tenantId: string
    applicationId: string
    environment: string
    labels: any
};

export type RawMoment = {
    kind: string
    when: number
    metadata: RawMomentMetadata
    data: any
};

const dolittleClient = buildProducerClient();
const listenOn = process.env.LISTEN_ON ? process.env.LISTEN_ON : ':8080';
const clusterId = process.env.STAN_CLUSTER_ID ? process.env.STAN_CLUSTER_ID : 'stan';
const clientId = process.env.STAN_CLIENT_ID ? process.env.STAN_CLIENT_ID : 'ts-reader-gh-2';
const topic = process.env.TOPIC ? process.env.TOPIC : 'purchaseorders';
const servers = [
    process.env.NATS_SERVER ? process.env.NATS_SERVER : 'localhost'
];
const durableName = 'foobar-1';

const sc = connect(clusterId, clientId, {
    servers,
});

sc.on('connect', () => {
    console.log('connected');
    const opts = sc.subscriptionOptions()
        //.setDurableName('foobar-1')
        //.setStartWithLastReceived()
        .setDeliverAllAvailable()
        .setMaxInFlight(1);
    const subscription = sc.subscribe(topic, opts);
    subscription.on('message', async (msg) => {
        const data = JSON.parse(msg.getData());
        const events = eventProducer.produce(data.data);
        console.log(events);

        for (const event of events) {
            await dolittleClient.eventStore
                .forTenant(TenantId.development)
                .commit(event, '3b9dfbaf-8592-46ab-95f0-7845926b2c23');
        }
        //console.log('received msg', msg.getData());
    });
});

/*sc.on('close', () => {
    process.exit()
})

process.once('SIGINT', () => {
    console.log('SIGINT received...');
    sc.close();
});

process.once('SIGTERM', () => {
    console.log('SIGTERM received...');
    sc.close();
});*/
