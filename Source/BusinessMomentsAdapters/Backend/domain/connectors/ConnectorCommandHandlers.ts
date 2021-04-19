// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Arg, Resolver, Mutation } from 'type-graphql';
import { DefineEmbed } from './DefineEmbed';
import { IAggregate } from '@dolittle/vanir-backend';
import { injectable } from 'tsyringe';
import { Connector } from './Connector';

@Resolver()
@injectable()
export class ConnectorCommandHandlers {
    constructor(private readonly _aggregate: IAggregate) {
    }

    @Mutation(() => Boolean)
    async defineEmbed(@Arg('command') command: DefineEmbed): Promise<boolean> {
        const connector = await this._aggregate.of(Connector, command.connectorId);
        await connector.perform(_ => _.defineEmbed(command.code));
        return true;
    }
}
