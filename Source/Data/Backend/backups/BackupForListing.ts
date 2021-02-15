// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Field, ObjectType } from 'type-graphql';
import { guid } from '@dolittle/vanir-backend/dist/data';
import { Guid } from '@dolittle/rudiments';
import { prop, getModelForClass } from '@typegoose/typegoose';



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



@ObjectType()
export class BackupsForApplication {
    @Field()
    @prop()
    tenant!: string;

    @Field()
    @prop()
    application!: string;

    @Field(() => [String])
    @prop()
    files!: string[];

}
export const BackupsForApplicationModel = getModelForClass(BackupsForApplication);


@ObjectType()
export class BackupLink {
    @Field()
    @prop()
    tenant!: string;

    @Field()
    @prop()
    application!: string;

    @Field()
    @prop()
    url!: string;

    @Field()
    @prop()
    expire!: string;
}
export const BackupLinkModel = getModelForClass(BackupLink);


export type BackupLinkShareInput = {
    tenant: string;
    application: string;
    file_path: string;
}

