// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Connector, MinerWithIdAlreadyExists } from '../../Connector';
import { EventSourceId } from '@dolittle/sdk.events';
import { Guid } from '@dolittle/rudiments';
import { BrokenRuleError } from '@dolittle/vanir-backend';

describe('when adding miner and there is an existing with same id', () => {
    const adapter = new Connector(EventSourceId.from('46e44f22-1e76-4110-8b1d-d088cd3a1481'));
    adapter.onMinerAddedToConnector({
        name: 'Some other miner',
        minerId: 'a60bd940-7a3f-417d-bf2d-8126513fe3fc'
    });

    let brokenRuleError: BrokenRuleError;

    try {
        adapter.addMiner(Guid.parse('a60bd940-7a3f-417d-bf2d-8126513fe3fc'), 'Some miner');
    } catch (ex) {
        brokenRuleError = ex;
    }

    it('should fail with a miner with id already exists broken rule', () => brokenRuleError.rule.should.be.equal(MinerWithIdAlreadyExists));
});
