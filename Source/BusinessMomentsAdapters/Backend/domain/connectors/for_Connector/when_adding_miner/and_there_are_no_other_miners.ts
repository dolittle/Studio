// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Connector } from '../../Connector';
import { EventSourceId } from '@dolittle/sdk.events';
import { Guid } from '@dolittle/rudiments';
import { MinerAddedToConnector } from '../../../../events/connectors';

describe('when adding miner and there are no other miners', () => {
    const name = 'Some Miner';
    const minerId = Guid.parse('a60bd940-7a3f-417d-bf2d-8126513fe3fc');
    const adapter = new Connector(EventSourceId.from('46e44f22-1e76-4110-8b1d-d088cd3a1481'));
    adapter.addMiner(minerId, name);

    it('should have one applied event', () => adapter.appliedEvents.should.be.lengthOf(1));
    it('should apply the connector added to adapter event', () => adapter.appliedEvents[0].event.should.be.instanceOf(MinerAddedToConnector));
    it('should pass along the name to the event', () => (adapter.appliedEvents[0].event as MinerAddedToConnector).name.should.equal(name));
    it('should pass along the connectorId to the event', () => (adapter.appliedEvents[0].event as MinerAddedToConnector).minerId.should.equal(minerId.toString()));
});
