// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

//import { Field, ObjectType } from 'type-graphql';
import { prop, getModelForClass, modelOptions, mongoose } from '@typegoose/typegoose';

//@ObjectType()
@modelOptions({ schemaOptions: { id: false } })
export class PurchaseOrder {
    //@Field({ name: 'orderNumber' })
    @prop({ required: true, unique: true })
    orderNumber?: string;

    //@Field({ name: 'facilityNumber' })
    @prop({ required: true })
    facilityNumber?: number;

    @prop()
    lowestStatus?: string;

    @prop()
    highestStatus?: string;

    @prop()
    changeNumber?: number;

    @prop()
    lines?: mongoose.Types.Array<PurchaseOrderLine>;
}

export class PurchaseOrderLine {
    lineNumber?: number;
    subLineNumber?: number;
    itemNumber?: string;
    highestStatus?: string;
}

export const PurchaseOrderModel = getModelForClass(PurchaseOrder);

