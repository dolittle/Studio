// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Field, ObjectType } from 'type-graphql';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { Environment } from './Environment';

@ObjectType()
export class Application {
    @Field({ name: 'id' })
    @prop()
    _id?: string;

    @Field()
    @prop()
    name!: string;

    environments!: Environment[];
}
export const ApplicationModel = getModelForClass(Application);
