// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Adapter, ConnectorWithIdAlreadyExists } from '../../Adapter';
import { EventSourceId } from '@dolittle/sdk.events';
import { Guid } from '@dolittle/rudiments';
import { ConnectorTypes } from '../../../../concepts';
import { BrokenRuleError } from '@dolittle/vanir-backend';

describe('when adding connector and there is an existing with same id', () => {
    const adapter = new Adapter(EventSourceId.from('46e44f22-1e76-4110-8b1d-d088cd3a1481'));
    adapter.onConnectorAddedToAdapter({
        name: 'Some Other Connector',
        connectorId: 'f4815694-5698-4fa6-8938-ad9104a7b63a',
        connectorTypeId: ConnectorTypes.WebHook.toString()
    });

    let brokenRuleError: BrokenRuleError;

    try {
        adapter.addConnector('Some Connector', Guid.parse('f4815694-5698-4fa6-8938-ad9104a7b63a'), ConnectorTypes.WebHook);
    } catch (ex) {
        brokenRuleError = ex;
    }

    it('should fail with a connector with id already exists broken rule', () => brokenRuleError.rule.should.be.equal(ConnectorWithIdAlreadyExists));
});
