// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
export type ConnectorWebhookConfigBearer = {
    token: string
};

export type ConnectorWebhookConfigBasic = {
    username: string
    password: string
};

export type ConnectorWebhookConfig = {
    domain: string
    uriPrefix: string
    kind: string

    // ConnectorWebhookConfigBasic
    // ConnectorWebhookConfigBearer
    config: any
};

export type Connector = {
    id: string
    name: string
    kind: string
    config: ConnectorWebhookConfig
};

export type Entity = {
    id: string
    name: string
    connectorId: string
    filterCode: string
    transformCode: string
};

export type MicroserviceDolittle = {
    applicationId: string
    tenantId: string
    microserviceId: string
};

export type MicroserviceIngressPath = {
    path: string
    pathType: string
};

export type MicroserviceSimple = {
    dolittle: MicroserviceDolittle
    name: string
    kind: string
    extra: MicroserviceSimpleExtra
};

export type MicroserviceSimpleExtra = {
    headImage: string
    runtimeImage: string
    environment: string
    ingress: MicroserviceIngressPath
};

const db = {
    connectors: [
        {
            id: 'm3-webhook-1-basic',
            name: 'M3 Webhook Connector Basic',
            kind: 'webhook',
            config: {
                domain: '',
                uriPrefix: '',
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
                domain: '',
                uriPrefix: '',
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

// Connectors
export function getConnectors(): Connector[] {
    return db.connectors;
}

export function getConnector(id: string): Connector {
    const found = db.connectors.find(c => {
        return c.id === id;
    });

    if (found) {
        return found;
    }

    return {
        id: '',
        name: '',
        kind: 'webhook',
        config: {
            domain: '',
            uriPrefix: '',
            kind: '',
            config: {}
        }
    };
}

export function saveConnector(input: Connector) {
    const found = db.connectors.findIndex(c => {
        return c.id === input.id;
    });

    if (found !== -1) {
        db.connectors[found] = input;
    } else {
        db.connectors.push(input);
    }

    return db.connectors;
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

// Microservice
export async function createMicroservice(kind: string, input: any): Promise<boolean> {
    if (kind !== 'simple') {
        alert('TODO');
        return false;
    }

    console.log(input as MicroserviceSimple);
    // TODO parse in URI
    // TODO tenant in header
    const result = await fetch('http://localhost:8080/microservice', {
        method: 'POST',
        body: JSON.stringify(input),
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
            'x-tenant': (input.dolittle as MicroserviceDolittle).tenantId // TODO this is not correct
        }
    });
    const jsonResult = await result.json();
    console.log(jsonResult);
    return true;
}

//

export function getTenant(): string {
    //const tenantId = 'fe7736bb-57fc-4166-bb91-6954f4dd4eb7';
    return '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3';
}
