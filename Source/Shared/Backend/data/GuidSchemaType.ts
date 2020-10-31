// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { mongoose } from '@typegoose/typegoose';
import { Guid } from '@dolittle/rudiments';
import './GuidExtensions';
import { MUUID } from 'uuid-mongodb';

export class GuidSchemaType extends mongoose.SchemaType {
    constructor(key: string, options: any) {
        super(key, options, 'Guid');
    }

    cast(val: any) {
        if (val instanceof Guid) {
            return (val as Guid).toMUUID();
        } else {
            return (val as MUUID).toGuid();
        }
    }
}

(mongoose.Schema.Types as any).Guid = GuidSchemaType;