// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { InputType, Field } from 'type-graphql';
import { Guid } from '@dolittle/rudiments';
import { MinLength } from 'class-validator';

@InputType({ description: 'This defines a projection for an entity' })
export class DefineProjection {
    @Field()
    entityId!: Guid;

    @Field()
    @MinLength(1)
    code!: string;
}
