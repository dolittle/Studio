// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Miner {
    @Field()
    _id!: string;

    @Field()
    imperativeEmbed!: string;
}

