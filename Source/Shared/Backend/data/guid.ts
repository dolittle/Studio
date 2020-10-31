import { prop } from '@typegoose/typegoose';
import { GuidSchemaType } from './GuidSchemaType';

export function guid() {
    return prop({ name: GuidSchemaType });
}
