// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Field, ObjectType } from 'type-graphql';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { MicroserviceForListing } from './MicroserviceForListing';

@ObjectType()
export class ApplicationForListing {
    @Field({ name: 'id' })
    @prop()
    _id?: string;

    @Field()
    @prop()
    name!: string;

    @Field(() => [MicroserviceForListing])
    microservices!: MicroserviceForListing[];
}
export const ApplicationForListingModel = getModelForClass(ApplicationForListing);
