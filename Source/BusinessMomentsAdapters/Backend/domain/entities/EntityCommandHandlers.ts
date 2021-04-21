// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Arg, Resolver, Mutation } from 'type-graphql';
import { DefineTransform } from './DefineTransform';
import { DefineProjection } from './DefineProjection';
import { DefineFilter } from './DefineFilter';
import { injectable } from 'tsyringe';
import { IAggregate } from '@dolittle/vanir-backend';
import { Entity } from './Entity';

@Resolver()
@injectable()
export class EntityCommandHandlers {
    constructor(private readonly _aggregate: IAggregate) { }

    @Mutation(() => Boolean)
    async defineFilter(@Arg('command') command: DefineFilter): Promise<boolean> {
        const connector = await this._aggregate.of(Entity, command.entityId);
        await connector.perform(_ => _.defineFilter(command.code));
        return true;
    }

    @Mutation(() => Boolean)
    async defineTransform(@Arg('command') command: DefineTransform): Promise<boolean> {
        const connector = await this._aggregate.of(Entity, command.entityId);
        await connector.perform(_ => _.defineTransform(command.code));
        return true;
    }

    @Mutation(() => Boolean)
    async defineProjection(@Arg('command') command: DefineProjection): Promise<boolean> {
        const connector = await this._aggregate.of(Entity, command.entityId);
        await connector.perform(_ => _.defineProjection(command.code));
        return true;
    }
}
