// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Adapter } from '../Adapter';
import { EventSourceId } from '@dolittle/sdk.events';
import { Guid } from '@dolittle/rudiments';
import { ConnectorTypes } from '../../../concepts';
import { ConnectorAddedToAdapter } from '../../../events/adapters';

describe('when adding first connector', () => {
    const name = 'Some Adapter';
    const connectorId = Guid.parse('a60bd940-7a3f-417d-bf2d-8126513fe3fc');
    const adapter = new Adapter(EventSourceId.from('46e44f22-1e76-4110-8b1d-d088cd3a1481'));
    adapter.addConnector(name, connectorId, ConnectorTypes.WebHook);

    it('should have one applied event', () => adapter.appliedEvents.should.be.lengthOf(1));
    it('should apply the connector added to adapter event', () => adapter.appliedEvents[0].event.should.be.instanceOf(ConnectorAddedToAdapter));
    it('should pass along the name to the event', () => (adapter.appliedEvents[0].event as ConnectorAddedToAdapter).name.should.equal(name));
    it('should pass along the connectorId to the event', () => (adapter.appliedEvents[0].event as ConnectorAddedToAdapter).connectorId.should.equal(connectorId.toString()));
    it('should pass along the connectorType to the event', () => (adapter.appliedEvents[0].event as ConnectorAddedToAdapter).connectorTypeId.should.equal(ConnectorTypes.WebHook.toString()));
});
