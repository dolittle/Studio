// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export type Connector = {
    id: string
    name: string
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
            id: 'fake-uuid',
            name: 'M3 Webhook Connector'
        }
    ],
    entities: [
        {
            id: '',
            name: '',
            connectorId: '',
            filterCode: '',
            transformCode: ''
        }
    ]
};

export function getConnectors(): Connector[] {
    return db.connectors;
}

export function saveEntity(entity: Entity): boolean {
    console.log(entity);
    return true;
}


export function getRawLogs(): any[] {
    return [];
}
