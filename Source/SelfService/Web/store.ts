// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { saveBusinessMomentsAdaptorMicroservice, saveSimpleMicroservice } from './api/api';
import { MicroserviceBusinessMomentAdaptor, MicroserviceSimple } from './api/index';
export type Entity = {
    id: string
    name: string
    connectorId: string
    filterCode: string
    transformCode: string
};

const db = {
    connectors: [
        {
            id: 'm3-webhook-1-basic',
            name: 'M3 Webhook Connector Basic',
            kind: 'webhook',
            config: {
                kind: 'basic',
                config: {
                    username: 'iamtest1',
                    password: 'test123'
                }
            }
        },
        {
            id: 'm3-webhook-1-bearer',
            name: 'M3 Webhook Connector Bearer',
            kind: 'webhook',
            config: {
                kind: 'bearer',
                config: {
                    token: 'iamatoken'
                }
            }
        }
    ],
    entities: [
        {
            id: 'fake-entity-1',
            name: 'All',
            connectorId: 'm3-webhook-1-basic',
            filterCode: '',
            transformCode: ''
        }
    ]
};

export function uriWithAppPrefix(uri: string): string {
    const prefix = '/selfservice';
    return `${prefix}${uri}`;
}

// Entities
export function getEntitiesByConnector(id: string): Entity[] {
    return db.entities.filter(e => e.connectorId === id);
}

export function getEntity(id: string): Entity | undefined {
    const found = db.entities.find(c => {
        return c.id === id;
    });
    return found;
}

export function saveEntity(entity: Entity): boolean {
    console.log(entity);
    return true;
}


export function getRawLogs(): any[] {
    return [];
}
// TODO REMOVE
export function getConnectors() {
    return [
        {
            id: 'fake-1',
            name: 'fake 1',
        },
        {
            id: 'fake-2',
            name: 'fake 2',
        }
    ];
}


// Microservice
export async function createMicroservice(kind: string, input: any): Promise<boolean> {
    switch (kind) {
        case 'simple':
            return saveSimpleMicroservice(input as MicroserviceSimple);
        case 'business-moments-adaptor':
            return saveBusinessMomentsAdaptorMicroservice(input as MicroserviceBusinessMomentAdaptor);
        default:
            alert(`kind: ${kind} not supported`);
            return false;
    }
}

//
export function getTenant(): string {
    //const tenantId = 'fe7736bb-57fc-4166-bb91-6954f4dd4eb7';
    return '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3';
}



export function getFakeMicroserviceBusinessMomentsAdaptor(): MicroserviceBusinessMomentAdaptor {
    return {
        dolittle: {
            applicationId: '11b6cf47-5d9f-438f-8116-0d9828654657',
            tenantId: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
            microserviceId: '9f6a613f-d969-4938-a1ac-5b7df199bc41'
        },
        name: 'Webhook-101',
        kind: 'business-moments-adaptor',
        environment: 'Dev',
        extra: {
            headImage: '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/businessmomentsadaptor:latest',
            runtimeImage: 'dolittle/runtime:5.6.0',
            ingress: {
                path: '/api/webhooks-ingestor',
                pathType: 'Prefix'
            },
            connector: {
                kind: 'webhook',
                config: {
                    kind: 'basic',
                    config: {
                        username: 'm3',
                        password: 'johncarmack'
                    }
                }
            }
        }
    } as MicroserviceBusinessMomentAdaptor;
}

