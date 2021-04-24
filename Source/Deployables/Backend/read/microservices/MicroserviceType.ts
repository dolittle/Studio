// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ObjectType, Field } from 'type-graphql';
import { Guid } from '@dolittle/rudiments';

@ObjectType()
export class MicroserviceType {
    @Field()
    id!: Guid;

    @Field()
    name!: string;
}
