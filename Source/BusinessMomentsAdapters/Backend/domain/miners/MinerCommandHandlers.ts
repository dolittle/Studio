// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Arg, Resolver, Mutation } from 'type-graphql';
import { AssociateEntityWithMiner } from './AssociateEntityWithMiner';
import { IAggregate } from '@dolittle/vanir-backend';
import { Miner } from './Miner';

@Resolver()
export class MinerCommandHandlers {
    constructor(private readonly _aggregate: IAggregate) { }

    @Mutation(() => Boolean)
    async associateEntityWithMiner(@Arg('command') command: AssociateEntityWithMiner): Promise<boolean> {
        const miner = await this._aggregate.of(Miner, command.minerId);
        await miner.perform(_ => _.associateEntity(command.entityId));
        return false;
    }
}
