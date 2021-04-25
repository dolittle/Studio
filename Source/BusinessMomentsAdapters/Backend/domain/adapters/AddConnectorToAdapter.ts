// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { InputType, Field } from 'type-graphql';
import { MinLength } from 'class-validator';
import { connectorType } from '../../concepts';

@InputType({ description: 'Add a connector of a specific type to an adapter' })
export class AddConnectorToAdapter {
    @Field()
    @MinLength(1)
    name!: string;

    @Field()
    adapterId!: Guid;

    @Field()
    connectorId!: Guid;

    @Field()
    @connectorType()
    connectorTypeId!: Guid;
}
