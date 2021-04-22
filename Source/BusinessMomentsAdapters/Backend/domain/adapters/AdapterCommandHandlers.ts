// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Resolver, Mutation, Arg } from 'type-graphql';
import { injectable } from 'tsyringe';
import { IAggregate, graphRoot } from '@dolittle/vanir-backend';
import { AddConnectorToAdapter } from './AddConnectorToAdapter';
import { Adapter } from './Adapter';

@Resolver()
@graphRoot('adapters')
@injectable()
export class AdapterCommandHandlers {
    constructor(private readonly _aggregate: IAggregate) {
    }

    @Mutation(() => Boolean)
    async addConnectorToAdapter(@Arg('command') command: AddConnectorToAdapter): Promise<boolean> {
        const adapter = await this._aggregate.of(Adapter, command.adapterId);
        await adapter.perform(_ => _.addConnector(command.name, command.connectorId, command.connectorTypeId));
        return true;
    }
}
