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

export function getConnector(id: string): Connector | undefined {
    const found = db.connectors.find(c => {
        return c.id === id;
    });
    return found;
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
// TODO Get entities, should be linked to a connector? hmm baby steps
export function getEntities(): Entity[] {
    return db.entities;
}

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
