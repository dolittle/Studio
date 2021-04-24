// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Arg, Resolver, Mutation } from 'type-graphql';
import { AssociateEntityWithMiner } from './AssociateEntityWithMiner';
import { IAggregate, graphRoot } from '@dolittle/vanir-backend';
import { Miner } from './Miner';
import { DefineEmbed } from './DefineEmbed';
import { injectable } from 'tsyringe';

@Resolver()
@graphRoot('miners')
@injectable()
export class MinerCommandHandlers {
    constructor(private readonly _aggregate: IAggregate) { }

    @Mutation(() => Boolean)
    async defineEmbed(@Arg('command') command: DefineEmbed): Promise<boolean> {
        const connector = await this._aggregate.of(Miner, command.minerId);
        await connector.perform(_ => _.defineEmbed(command.code));
        return true;
    }

    @Mutation(() => Boolean)
    async associateEntityWithMiner(@Arg('command') command: AssociateEntityWithMiner): Promise<boolean> {
        const miner = await this._aggregate.of(Miner, command.minerId);
        await miner.perform(_ => _.associateEntity(command.entityId));
        return true;
    }
}
