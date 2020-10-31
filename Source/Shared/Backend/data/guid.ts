// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { prop } from '@typegoose/typegoose';
import { GuidSchemaType } from './GuidSchemaType';

export function guid() {
    return prop({ name: GuidSchemaType });
}
