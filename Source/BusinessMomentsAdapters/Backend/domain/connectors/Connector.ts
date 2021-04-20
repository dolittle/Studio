// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { AggregateRoot, aggregateRoot, on } from '@dolittle/sdk.aggregates';
import { EventSourceId } from '@dolittle/sdk.events';
import { Guid } from '@dolittle/rudiments';
import { MinerAddedToConnector } from '../../events/connectors/MinerAddedToConnector';
import { BrokenRule } from '@dolittle/vanir-backend';

export const MinerWithNameAlreadyExists =
    BrokenRule.create('MinerWithNameAlreadyExists', 'Miner with name "{name"} already exists on connector "{connector}"');

@aggregateRoot('32d9629e-5484-45b2-848a-77c4bb1db0f8')
export class Connector extends AggregateRoot {
    private _miners: string[] = [];

    constructor(eventSourceId: EventSourceId) {
        super(eventSourceId);
    }

    addMiner(minerId: Guid, name: string) {
        this.apply(new MinerAddedToConnector(minerId.toString(), name));
    }

    @on(MinerAddedToConnector)
    onMinerAddedToConnector(event: MinerAddedToConnector) {
        this._miners.push(event.name);
    }

    private failIfMinerWithNameAlreadyExists(name: string) {
        if (this._miners.some(_ => _ === name)) {
            this.fail(MinerWithNameAlreadyExists, {
                name,
                connector: this.eventSourceId.toString()
            });
        }
    }
}
