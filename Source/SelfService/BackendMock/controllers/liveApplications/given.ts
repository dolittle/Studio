// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { applications } from '../../api/index';

export const allLiveApplications: applications.AllApplications = {
    id: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
    name: 'Customer-Chris',
    applications: [
        {
            name: 'Taco',
            environment: 'Dev',
            id: '11b6cf47-5d9f-438f-8116-0d9828654657',
        },
    ],
};

export const allMicroservicesInLiveApplication: applications.HttpResponseMicroservices = {
    application: {
        name: 'Taco',
        id: '11b6cf47-5d9f-438f-8116-0d9828654657',
    },
    microservices: [
        {
            name: 'FavouriteColour',
            environment: 'Dev',
            id: 'ee581646-9ba8-524d-8bbe-7d570a257aa0',
            images: [
                {
                    image: '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/dolittle/nats-reader:favouritecolour',
                    name: 'head',
                },
            ],
        },
        {
            name: 'Order',
            environment: 'Dev',
            id: '9f6a613f-d969-4938-a1ac-5b7df199bc39',
            images: [
                {
                    image: '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/taco/order:1.0.6',
                    name: 'head',
                },
                {
                    image: 'dolittle/runtime:5.3.3',
                    name: 'runtime',
                },
            ],
        },
    ],
};

export const podStatus = {
    namespace: 'application-11b6cf47-5d9f-438f-8116-0d9828654657',
    microservice: {
        name: 'RawDataLogIngestor',
        id: '70899a1b-5d80-6f4a-aa9f-3a144953f3e6',
    },
    pods: [
        {
            name: 'dev-rawdatalogingestor-6dd8999646-dnsl7',
            phase: 'Running',
            containers: [
                {
                    image: '388c0cc724b246a78735b583ce21e01b.azurecr.io/dolittle/platform/platform-api:dev-x',
                    name: 'head',
                    age: '1130h17m40.950472455s',
                    state: 'running',
                    started: '2021-07-16 11:29:04 +0000 UTC',
                    restarts: 0,
                },
            ],
        },
    ],
};

export const podLogs = {
    applicationId: '11b6cf47-5d9f-438f-8116-0d9828654657',
    microserviceId: 'TODO',
    podName: 'dev-rawdatalogingestor-6dd8999646-dnsl7',
    logs: '',
};
