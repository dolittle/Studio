// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { AggregateRoot, aggregateRoot, on } from '@dolittle/sdk.aggregates';
import { EventSourceId } from '@dolittle/sdk.events';
import { Guid } from '@dolittle/rudiments';
import { MinerAddedToConnector } from '../../events/connectors/MinerAddedToConnector';
import { BrokenRule } from '@dolittle/vanir-backend';

export const MinerWithNameAlreadyExists =
    BrokenRule.create('MinerWithNameAlreadyExists', 'Miner with name "{name"} already exists on connector "{connector}"');

export const MinerWithIdAlreadyExists =
    BrokenRule.create('MinerWithIdAlreadyExists', 'Miner with identifier "{id}" already exists on connector "{connector}"');

@aggregateRoot('32d9629e-5484-45b2-848a-77c4bb1db0f8')
export class Connector extends AggregateRoot {
    private _miners: { id: Guid, name: string }[] = [];

    constructor(eventSourceId: EventSourceId) {
        super(eventSourceId);
    }

    addMiner(minerId: Guid, name: string) {
        this.failIfMinerWithNameAlreadyExists(name);
        this.failIfMinerWithIdAlreadyExists(minerId);
        this.apply(new MinerAddedToConnector(minerId.toString(), name));
    }

    @on(MinerAddedToConnector)
    onMinerAddedToConnector(event: MinerAddedToConnector) {
        this._miners.push({
            id: Guid.parse(event.minerId),
            name: event.name
        });
    }

    private failIfMinerWithNameAlreadyExists(name: string) {
        if (this._miners.some(_ => _.name === name)) {
            this.fail(MinerWithNameAlreadyExists, {
                name,
                connector: this.eventSourceId.toString()
            });
        }
    }

    private failIfMinerWithIdAlreadyExists(id: Guid) {
        if (this._miners.some(_ => _.id.equals(id))) {
            this.fail(MinerWithIdAlreadyExists, {
                id,
                connector: this.eventSourceId.toString()
            });
        }
    }
}
