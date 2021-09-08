// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { applications } from '../../api/index';

export const allApplications: applications.AllApplications = {
    id: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
    name: 'Customer-Chris',
    applications: [
        {
            name: 'Taco',
            environment: 'Dev',
            id: '11b6cf47-5d9f-438f-8116-0d9828654657'
        }
    ]
};

export const allMicroservicesInApplication: applications.AllMicroservicesInApplication = [
    {
        dolittle: {
            applicationId: '11b6cf47-5d9f-438f-8116-0d9828654657',
            tenantId: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
            microserviceId: '70899a1b-5d80-6f4a-aa9f-3a144953f3e6'
        },
        name: 'RawDataLogIngestor',
        kind: 'raw-data-log-ingestor',
        environment: 'Dev',
        extra: {
            headImage: '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/dolittle/platform/platform-api:dev-x',
            ingress: {
                domainPrefix: 'freshteapot-taco',
                host: 'freshteapot-taco.dolittle.cloud',
                path: '/api/webhooks',
                pathType: 'Prefix',
                secretNamePrefix: ''
            },
            runtimeImage: 'dolittle/runtime:5.6.0',
            webhookStatsAuthorization: 'Bearer TODO',
            webhooks: [
                {
                    authorization: 'Basic am9objpjYXI=',
                    kind: 'm3/headline',
                    uriSuffix: 'm3/headline'
                },
                {
                    authorization: 'Bearer BubblegumPink',
                    kind: 'favouriteColour',
                    uriSuffix: 'favourite/colour'
                },
                {
                    authorization: '',
                    kind: '',
                    uriSuffix: ''
                }
            ],
            writeTo: 'nats'
        }
    },
    {
        dolittle: {
            applicationId: '11b6cf47-5d9f-438f-8116-0d9828654657',
            tenantId: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
            microserviceId: '83d7569c-9142-fa4b-b9f9-aee40c2e7718'
        },
        name: 'Webhook-101',
        kind: 'business-moments-adaptor',
        environment: 'Dev',
        extra: {
            connector: {
                config: {
                    config: {
                        password: 'johncarmack',
                        username: 'm3'
                    },
                    kind: 'basic'
                },
                kind: 'webhook'
            },
            entities: [],
            headImage: '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/businessmomentsadaptor:latest',
            ingress: {
                domainPrefix: 'freshteapot-taco',
                host: 'freshteapot-taco.dolittle.cloud',
                path: '/api/webhooks-ingestor',
                pathType: 'Prefix',
                secretNamePrefix: ''
            },
            moments: [],
            runtimeImage: 'dolittle/runtime:5.6.0'
        }
    },
    {
        dolittle: {
            applicationId: '11b6cf47-5d9f-438f-8116-0d9828654657',
            tenantId: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
            microserviceId: 'c83bfd80-9d72-614d-8dd0-f12b48eaaa41'
        },
        name: 'TestSindre',
        kind: 'simple',
        environment: 'Dev',
        extra: {
            headImage: 'nginxdemos/hello:latest',
            ingress: {
                domainPrefix: 'freshteapot-taco',
                host: 'freshteapot-taco.dolittle.cloud',
                path: '/test-sindre',
                pathType: 'Prefix',
                secretNamePrefix: ''
            },
            runtimeImage: 'dolittle/runtime:5.6.0'
        }
    },
    {
        dolittle: {
            applicationId: '11b6cf47-5d9f-438f-8116-0d9828654657',
            tenantId: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
            microserviceId: 'ee581646-9ba8-524d-8bbe-7d570a257aa0'
        },
        name: 'FavouriteColour',
        kind: 'simple',
        environment: 'Dev',
        extra: {
            headImage: '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/dolittle/nats-reader:favouritecolour',
            ingress: {
                domainPrefix: 'freshteapot-taco',
                host: 'freshteapot-taco.dolittle.cloud',
                path: '/what-is-your-favourite-colour',
                pathType: 'Prefix',
                secretNamePrefix: ''
            },
            runtimeImage: 'dolittle/runtime:5.6.0'
        }
    }
];

export const environmentsAndMicroservicesInApplication: applications.ApplicationDetailed = {
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
            automationEnabled: true
        }
    ],
    microservices: [
        {
            dolittle: {
                applicationId: '11b6cf47-5d9f-438f-8116-0d9828654657',
                tenantId: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
                microserviceId: '70899a1b-5d80-6f4a-aa9f-3a144953f3e6'
            },
            name: 'RawDataLogIngestor',
            kind: 'raw-data-log-ingestor',
            environment: 'Dev',
            extra: {
                headImage: '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/dolittle/platform/platform-api:dev-x',
                ingress: {
                    domainPrefix: 'freshteapot-taco',
                    host: 'freshteapot-taco.dolittle.cloud',
                    path: '/api/webhooks',
                    pathType: 'Prefix',
                    secretNamePrefix: ''
                },
                runtimeImage: 'dolittle/runtime:5.6.0',
                webhookStatsAuthorization: 'Bearer TODO',
                webhooks: [
                    {
                        authorization: 'Basic am9objpjYXI=',
                        kind: 'm3/headline',
                        uriSuffix: 'm3/headline'
                    },
                    {
                        authorization: 'Bearer BubblegumPink',
                        kind: 'favouriteColour',
                        uriSuffix: 'favourite/colour'
                    },
                    {
                        authorization: '',
                        kind: '',
                        uriSuffix: ''
                    }
                ],
                writeTo: 'nats'
            }
        },
        {
            dolittle: {
                applicationId: '11b6cf47-5d9f-438f-8116-0d9828654657',
                tenantId: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
                microserviceId: '83d7569c-9142-fa4b-b9f9-aee40c2e7718'
            },
            name: 'Webhook-101',
            kind: 'business-moments-adaptor',
            environment: 'Dev',
            extra: {
                connector: {
                    config: {
                        config: {
                            password: 'johncarmack',
                            username: 'm3'
                        },
                        kind: 'basic'
                    },
                    kind: 'webhook'
                },
                entities: [],
                headImage: '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/businessmomentsadaptor:latest',
                ingress: {
                    domainPrefix: 'freshteapot-taco',
                    host: 'freshteapot-taco.dolittle.cloud',
                    path: '/api/webhooks-ingestor',
                    pathType: 'Prefix',
                    secretNamePrefix: ''
                },
                moments: [],
                runtimeImage: 'dolittle/runtime:5.6.0'
            }
        },
        {
            dolittle: {
                applicationId: '11b6cf47-5d9f-438f-8116-0d9828654657',
                tenantId: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
                microserviceId: 'c83bfd80-9d72-614d-8dd0-f12b48eaaa41'
            },
            name: 'TestSindre',
            kind: 'simple',
            environment: 'Dev',
            extra: {
                headImage: 'nginxdemos/hello:latest',
                ingress: {
                    domainPrefix: 'freshteapot-taco',
                    host: 'freshteapot-taco.dolittle.cloud',
                    path: '/test-sindre',
                    pathType: 'Prefix',
                    secretNamePrefix: ''
                },
                runtimeImage: 'dolittle/runtime:5.6.0'
            }
        },
        {
            dolittle: {
                applicationId: '11b6cf47-5d9f-438f-8116-0d9828654657',
                tenantId: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
                microserviceId: 'ee581646-9ba8-524d-8bbe-7d570a257aa0'
            },
            name: 'FavouriteColour',
            kind: 'simple',
            environment: 'Dev',
            extra: {
                headImage: '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/dolittle/nats-reader:favouritecolour',
                ingress: {
                    domainPrefix: 'freshteapot-taco',
                    host: 'freshteapot-taco.dolittle.cloud',
                    path: '/what-is-your-favourite-colour',
                    pathType: 'Prefix',
                    secretNamePrefix: ''
                },
                runtimeImage: 'dolittle/runtime:5.6.0'
            }
        }
    ]
};
