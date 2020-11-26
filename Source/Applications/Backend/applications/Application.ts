// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Field, ObjectType } from 'type-graphql';
import { guid } from '@shared/backend/data';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { Guid } from '@dolittle/rudiments';
import { Microservice } from './Microservice';

@ObjectType()
export class Application {
    @Field({ name: 'id' })
    @guid()
    _id?: Guid;

    @Field()
    @prop()
    name!: string;

    environments!: Environment[];
}
export const ApplicationModel = getModelForClass(Application);

export class Environment {
    @Field({ name: 'id' })
    @guid()
    _id?: Guid;

    name!: string;

    tenants!: Tenant[];

    microservices!: Microservice[];
}

export class Tenant {
    @Field({ name: 'id' })
    @guid()
    _id?: Guid;

    name?: string;
}