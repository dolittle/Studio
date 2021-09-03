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
        id: '11b6cf47-5d9f-438f-8116-0d9828654657'
    },
    microservices: [
        {
            name: 'FavouriteColour',
            environment: 'Dev',
            id: 'ee581646-9ba8-524d-8bbe-7d570a257aa0',
            images: [
                {
                    image: '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/dolittle/nats-reader:favouritecolour',
                    name: 'head'
                }
            ]
        },
        {
            name: 'Order',
            environment: 'Dev',
            id: '9f6a613f-d969-4938-a1ac-5b7df199bc39',
            images: [
                {
                    image: '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/taco/order:1.0.6',
                    name: 'head'
                },
                {
                    image: 'dolittle/runtime:5.3.3',
                    name: 'runtime'
                }
            ]
        },
        {
            name: 'RawDataLogIngestor',
            environment: 'Dev',
            id: '70899a1b-5d80-6f4a-aa9f-3a144953f3e6',
            images: [
                {
                    image: '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/dolittle/platform/platform-api:dev-x',
                    name: 'head'
                }
            ]
        },
        {
            name: 'TestSindre',
            environment: 'Dev',
            id: 'c83bfd80-9d72-614d-8dd0-f12b48eaaa41',
            images: [
                {
                    image: 'nginxdemos/hello:latest',
                    name: 'head'
                },
                {
                    image: 'dolittle/runtime:5.6.0',
                    name: 'runtime'
                }
            ]
        },
        {
            name: 'Webhook-101',
            environment: 'Dev',
            id: '83d7569c-9142-fa4b-b9f9-aee40c2e7718',
            images: [
                {
                    image: '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/businessmomentsadaptor:latest',
                    name: 'head'
                },
                {
                    image: 'dolittle/runtime:5.6.0',
                    name: 'runtime'
                }
            ]
        }
    ]
};

export const podStatus = {
    namespace: 'application-11b6cf47-5d9f-438f-8116-0d9828654657',
    microservice: {
        name: 'Order',
        id: '9f6a613f-d969-4938-a1ac-5b7df199bc39'
    },
    pods: [
        {
            name: 'dev-order-569c9675f4-m2kl8',
            phase: 'Running',
            containers: [
                {
                    image: '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/taco/order:1.0.6',
                    name: 'head',
                    age: '885h9m2.944720584s',
                    state: 'running',
                    started: '2021-07-28 09:24:07 +0000 UTC',
                    restarts: 0
                },
                {
                    image: 'docker.io/dolittle/runtime:5.3.3',
                    name: 'runtime',
                    age: '885h9m2.944720584s',
                    state: 'running',
                    started: '2021-07-28 09:24:07 +0000 UTC',
                    restarts: 0
                }
            ]
        }
    ]
};

export const podLogs = {
    applicationId: '11b6cf47-5d9f-438f-8116-0d9828654657',
    microserviceId: 'TODO',
    podName: 'dev-order-569c9675f4-m2kl8',
    logs: "{ event: 'dish-prepared', Dish: 'fish N chips', Chef: 'English Guy' }\n"
};
