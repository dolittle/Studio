// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { AggregateRoot, aggregateRoot, on } from '@dolittle/sdk.aggregates';
import { EventSourceId } from '@dolittle/sdk.events';
import { Guid } from '@dolittle/rudiments';
import { ConnectorAddedToAdapter } from '../../events/adapters';
import { BrokenRule } from '@dolittle/vanir-backend';

export const ConnectorWithNameAlreadyExists =
    BrokenRule.create('ConnectorWithNameAlreadyExists', 'Connector with name "{name}" already exists on adapter "{adapter}"');

export const ConnectorWithIdAlreadyExists =
    BrokenRule.create('ConnectorWithIdAlreadyExists', 'Connector with identifier "{id}" already exists on adapter "{adapter}"');
@aggregateRoot('08dfe483-0b6a-40e1-95b7-1b3c7ccaf187')
export class Adapter extends AggregateRoot {
    private _connectors: { id: Guid, name: string }[] = [];

    constructor(eventSourceId: EventSourceId) {
        super(eventSourceId);
    }

    addConnector(name: string, connectorId: Guid, connectorTypeId: Guid): void {
        this.failIfConnectorWithNameAlreadyExists(name);
        this.failIfConnectorWithIdAlreadyExists(connectorId);
        this.apply(new ConnectorAddedToAdapter(name, connectorId.toString(), connectorTypeId.toString()));
    }

    @on(ConnectorAddedToAdapter)
    onConnectorAddedToAdapter(event: ConnectorAddedToAdapter) {
        this._connectors.push({
            id: Guid.parse(event.connectorId),
            name: event.name
        });
    }

    private failIfConnectorWithNameAlreadyExists(name: string) {
        if (this._connectors.some(_ => _.name === name)) {
            this.fail(ConnectorWithNameAlreadyExists, {
                name,
                adapter: this.eventSourceId.toString()
            });
        }
    }

    private failIfConnectorWithIdAlreadyExists(id: Guid) {
        if (this._connectors.some(_ => _.id.equals(id))) {
            this.fail(ConnectorWithIdAlreadyExists, {
                id,
                adapter: this.eventSourceId.toString()
            });
        }
    }
}
