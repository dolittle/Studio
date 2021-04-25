// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ObjectType, Field } from 'type-graphql';
import { Guid } from '@dolittle/rudiments';
import { guid } from '@dolittle/vanir-backend';

@ObjectType()
export class Miner {
    @Field({ name: 'id' })
    //@guid()
    _id!: string;

    @Field()
    name!: string;

    @Field()
    entityId!: string;

    @Field()
    imperativeEmbed!: string;
}

