// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { Field } from 'type-graphql';
import { prop } from '@typegoose/typegoose';
import { Microservice } from './Microservice';
import { Tenant } from './Tenant';


export class Environment {
    @Field({ name: 'id' })
    @prop()
    _id?: string;

    name!: string;

    tenants!: Tenant[];

    microservices!: Microservice[];
}
