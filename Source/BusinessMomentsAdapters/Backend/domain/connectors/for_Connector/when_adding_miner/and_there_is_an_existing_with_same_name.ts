// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Connector, MinerWithNameAlreadyExists } from '../../Connector';
import { EventSourceId } from '@dolittle/sdk.events';
import { Guid } from '@dolittle/rudiments';
import { BrokenRuleError } from '@dolittle/vanir-backend';

describe('when adding miner and there is an existing with same name', () => {
    const name = 'Some Miner';
    const adapter = new Connector(EventSourceId.from('46e44f22-1e76-4110-8b1d-d088cd3a1481'));
    adapter.onMinerAddedToConnector({
        name,
        minerId: 'a60bd940-7a3f-417d-bf2d-8126513fe3fc'
    });

    let brokenRuleError: BrokenRuleError;

    try {
        adapter.addMiner(Guid.parse('f4815694-5698-4fa6-8938-ad9104a7b63a'), name);
    } catch (ex) {
        brokenRuleError = ex;
    }

    it('should fail with a miner with name already exists broken rule', () => brokenRuleError.rule.should.be.equal(MinerWithNameAlreadyExists));
});
