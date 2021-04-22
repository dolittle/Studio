// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Arg, Resolver, Mutation } from 'type-graphql';
import { IAggregate, graphRoot } from '@dolittle/vanir-backend';
import { injectable } from 'tsyringe';
import { AddMinerToConnector } from './AddMinerToConnector';
import { Connector } from './Connector';

@Resolver()
@graphRoot('connectors')
@injectable()
export class ConnectorCommandHandlers {
    constructor(private readonly _aggregate: IAggregate) {
    }

    @Mutation(() => Boolean)
    async addMinerToConnector(@Arg('command') command: AddMinerToConnector) {
        const connector = await this._aggregate.of(Connector, command.connectorId);
        await connector.perform(_ => _.addMiner(command.minerId, command.name));
        return true;
    }
}
