// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Field, ObjectType } from 'type-graphql';
import { guid } from '@shared/backend/data';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { Guid } from '@dolittle/rudiments';
import { EnvironmentForListing } from './EnvironmentForListing';

@ObjectType()
export class ApplicationForListing {
    @Field({ name: 'id' })
    @prop()
    _id?: string;

    @Field()
    @prop()
    name!: string;

    environments!: EnvironmentForListing[];
}
export const ApplicationModel = getModelForClass(ApplicationForListing);
