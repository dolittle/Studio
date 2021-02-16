// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Field, ObjectType } from 'type-graphql';
import { prop, getModelForClass } from '@typegoose/typegoose';



@ObjectType()
export class DolittleTenant {
    @Field()
    @prop()
    id?: string;

    @Field()
    @prop()
    name!: string;
}
export const DolittleTenantModel = getModelForClass(DolittleTenant);


@ObjectType()
export class CustomerApplication {
    @Field()
    @prop()
    id!: string;

    @Field()
    @prop()
    name!: string;

    @Field()
    @prop()
    environment!: string;
}
export const CustomerApplicationModel = getModelForClass(CustomerApplication);

@ObjectType()
export class CustomerDomain {
    @Field()
    @prop()
    name!: string;
}
export const CustomerDomainModel = getModelForClass(CustomerDomain);


@ObjectType()
export class ApplicationForListing {
    @Field(() => [CustomerApplication])
    @prop()
    applications!: CustomerApplication[];

    @Field()
    @prop()
    tenant!: DolittleTenant;
}
export const ApplicationForListingModel = getModelForClass(ApplicationForListing);
