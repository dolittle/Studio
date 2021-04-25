// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Miner, MinerAlreadyAssociatedWithEntity } from '../../Miner';
import { EventSourceId } from '@dolittle/sdk.events';
import { BrokenRuleError } from '@dolittle/vanir-backend';
import { Guid } from '@dolittle/rudiments';

describe('when associating entity and it is already associated with one', () => {
    const miner = new Miner(EventSourceId.from('4ee51767-e6b8-4cd4-a141-23aa3926b0b5'));
    miner.onEntityAssociatedWithMiner({
        entityId: '177bc88d-9227-42b0-bceb-8efe2f151ce1'
    });

    let brokenRuleError: BrokenRuleError;

    try {
        miner.associateEntity(Guid.parse('db5b4505-f43b-4516-9a48-72a07ecb0f90'));
    } catch (ex) {
        brokenRuleError = ex;
    }

    it('should fail with a miner already associated with entity error', () => brokenRuleError.rule.should.be.equal(MinerAlreadyAssociatedWithEntity));
});
