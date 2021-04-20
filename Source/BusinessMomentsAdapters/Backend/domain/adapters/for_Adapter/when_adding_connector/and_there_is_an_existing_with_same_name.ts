// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Adapter, ConnectorWithNameAlreadyExists } from '../../Adapter';
import { EventSourceId } from '@dolittle/sdk.events';
import { Guid } from '@dolittle/rudiments';
import { ConnectorTypes } from '../../../../concepts';
import { BrokenRuleError } from '@dolittle/vanir-backend';

describe('when adding connector and there is an existing with same name', () => {
    const name = 'Some Connector';
    const adapter = new Adapter(EventSourceId.from('46e44f22-1e76-4110-8b1d-d088cd3a1481'));
    adapter.onConnectorAddedToAdapter({
        name,
        connectorId: 'a60bd940-7a3f-417d-bf2d-8126513fe3fc',
        connectorTypeId: ConnectorTypes.WebHook.toString()
    });

    let brokenRuleError: BrokenRuleError;

    try {
        adapter.addConnector(name, Guid.parse('f4815694-5698-4fa6-8938-ad9104a7b63a'), ConnectorTypes.WebHook);
    } catch (ex) {
        brokenRuleError = ex;
    }

    it('should fail with a connector with name already exists broken rule', () => brokenRuleError.rule.should.be.equal(ConnectorWithNameAlreadyExists));
});
