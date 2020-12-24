// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Field, ObjectType } from 'type-graphql';
import { prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Microservice {
    @Field({ name: 'id' })
    @prop()
    _id?: string;

    @Field()
    @prop()
    name!: string;

    @Field()
    @prop()
    headImage!: string;

    @Field()
    @prop()
    runtimeImage!: string;
}

export const MicroserviceModel = getModelForClass(Microservice);
