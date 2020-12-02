// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Field, ObjectType } from 'type-graphql';
import { guid } from '@shared/backend/data';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { Guid } from '@dolittle/rudiments';

@ObjectType()
export class Microservice {
    @Field({ name: 'id' })
    @guid()
    _id?: Guid;

    @Field()
    @prop()
    name!: string;
}

export const MicroserviceModel = getModelForClass(Microservice);