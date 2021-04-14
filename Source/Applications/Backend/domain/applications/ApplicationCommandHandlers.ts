// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { CreateApplication } from './CreateApplication';
import { Resolver, Mutation, Query, Arg } from 'type-graphql';
import { IAggregate } from '@dolittle/vanir-backend';
import { injectable } from 'tsyringe';
import { Applications } from './Applications';

@Resolver()
@injectable()
export class ApplicationCommandHandlers {

    constructor(private readonly _aggregate: IAggregate) { }

    @Mutation(() => Boolean)
    async createApplication(@Arg('command') command: CreateApplication): Promise<boolean> {
        const applications = await this._aggregate.of(Applications, Applications.global)
        await applications.perform(_ => _.createApplication(command.applicationId, command.name));
        return true;
    }
}




