// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Field, ObjectType } from 'type-graphql';
import { prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class BackupsForApplication {
    @Field()
    @prop()
    tenant!: string;

    @Field()
    @prop()
    application!: string;

    @Field()
    @prop()
    environment!: string;

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
    tenant_id: string;
    application: string;
    environment: string;
    file_path: string;
};

