// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Field, ObjectType } from 'type-graphql';
import { guid } from '@dolittle/vanir-backend/dist/data';
import { Guid } from '@dolittle/rudiments';

@ObjectType()
export class BackupForListing {
    @Field()
    id?: Guid;

    @Field()
    @guid()
    applicationId!: Guid;

    @Field()
    microservice!: string;

    @Field()
    tenantId!: Guid;

    @Field()
    name!: string;

    @Field()
    date!: Date;
}


