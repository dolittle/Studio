// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Resolver } from 'type-graphql';
import { IAggregate } from '@dolittle/vanir-backend';
import { injectable } from 'tsyringe';

@Resolver()
@injectable()
export class ConnectorCommandHandlers {
    constructor(private readonly _aggregate: IAggregate) {
    }
}
