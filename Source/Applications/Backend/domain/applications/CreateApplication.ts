// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { InputType, Field } from 'type-graphql';
import { MinLength } from 'class-validator';

@InputType({ description: 'This is used for creating an application' })
export class CreateApplication {

    @Field()
    applicationId!: Guid;

    @Field()
    @MinLength(1)
    name!: string;
};
