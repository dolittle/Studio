export let allLiveApplications = {
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

export let allApplications = {
    id: '508c1745-5f2a-4b4c-b7a5-2fbb1484346d',
    name: 'Dolittle',
    applications: [
        {
            name: 'Sentry',
            environment: 'Prod',
            id: '215daeda-b2c7-4c8e-a305-586eb779733b',
        },
        {
            name: 'OCFEV',
            environment: 'Prod',
            id: '9d30c634-c540-4202-8bcd-9e960f369c42',
        },
        {
            name: 'Studio',
            environment: 'Dev',
            id: 'fe7736bb-57fc-4166-bb91-6954f4dd4eb7',
        },
        {
            name: 'Studio',
            environment: 'Prod',
            id: 'fe7736bb-57fc-4166-bb91-6954f4dd4eb7',
        },
    ],
};

export let allMicroservicesInApplication = [
    {
        dolittle: {
            applicationId: '11b6cf47-5d9f-438f-8116-0d9828654657',
            tenantId: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
            microserviceId: '70899a1b-5d80-6f4a-aa9f-3a144953f3e6',
        },
        name: 'RawDataLogIngestor',
        kind: 'raw-data-log-ingestor',
        environment: 'Dev',
        extra: {
            headImage:
                '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/dolittle/platform/platform-api:dev-x',
            ingress: {
                domainPrefix: 'freshteapot-taco',
                host: 'freshteapot-taco.dolittle.cloud',
                path: '/api/webhooks',
                pathType: 'Prefix',
                secretNamePrefix: '',
            },
            runtimeImage: 'dolittle/runtime:5.6.0',
            webhookStatsAuthorization: 'Bearer TODO',
            webhooks: [
                {
                    authorization: 'Basic am9objpjYXI=',
                    kind: 'm3/headline',
                    uriSuffix: 'm3/headline',
                },
                {
                    authorization: 'Bearer BubblegumPink',
                    kind: 'favouriteColour',
                    uriSuffix: 'favourite/colour',
                },
                {
                    authorization: '',
                    kind: '',
                    uriSuffix: '',
                },
            ],
            writeTo: 'nats',
        },
    },
    {
        dolittle: {
            applicationId: '11b6cf47-5d9f-438f-8116-0d9828654657',
            tenantId: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
            microserviceId: '83d7569c-9142-fa4b-b9f9-aee40c2e7718',
        },
        name: 'Webhook-101',
        kind: 'business-moments-adaptor',
        environment: 'Dev',
        extra: {
            connector: {
                config: {
                    config: {
                        password: 'johncarmack',
                        username: 'm3',
                    },
                    kind: 'basic',
                },
                kind: 'webhook',
            },
            entities: [],
            headImage:
                '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/businessmomentsadaptor:latest',
            ingress: {
                domainPrefix: 'freshteapot-taco',
                host: 'freshteapot-taco.dolittle.cloud',
                path: '/api/webhooks-ingestor',
                pathType: 'Prefix',
                secretNamePrefix: '',
            },
            moments: [],
            runtimeImage: 'dolittle/runtime:5.6.0',
        },
    },
];

export let environmentsAndMicroservicesInApplication = {
    id: '11b6cf47-5d9f-438f-8116-0d9828654657',
    name: 'Taco',
    tenantId: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
    environments: [
        {
            name: 'Dev',
            domainPrefix: 'freshteapot-taco',
            host: 'freshteapot-taco.dolittle.cloud',
            tenantId: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
            applicationId: '11b6cf47-5d9f-438f-8116-0d9828654657',
            automationEnabled: true,
        },
    ],
    microservices: [
        {
            dolittle: {
                applicationId: '11b6cf47-5d9f-438f-8116-0d9828654657',
                tenantId: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
                microserviceId: '70899a1b-5d80-6f4a-aa9f-3a144953f3e6',
            },
            name: 'RawDataLogIngestor',
            kind: 'raw-data-log-ingestor',
            environment: 'Dev',
            extra: {
                headImage:
                    '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/dolittle/platform/platform-api:dev-x',
                ingress: {
                    domainPrefix: 'freshteapot-taco',
                    host: 'freshteapot-taco.dolittle.cloud',
                    path: '/api/webhooks',
                    pathType: 'Prefix',
                    secretNamePrefix: '',
                },
                runtimeImage: 'dolittle/runtime:5.6.0',
                webhookStatsAuthorization: 'Bearer TODO',
                webhooks: [
                    {
                        authorization: 'Basic am9objpjYXI=',
                        kind: 'm3/headline',
                        uriSuffix: 'm3/headline',
                    },
                    {
                        authorization: 'Bearer BubblegumPink',
                        kind: 'favouriteColour',
                        uriSuffix: 'favourite/colour',
                    },
                    {
                        authorization: '',
                        kind: '',
                        uriSuffix: '',
                    },
                ],
                writeTo: 'nats',
            },
        },
    ],
};

export let allMicroservicesInLiveApplication = {
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

export let podStatus = {
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
