// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor } from '@dolittle/types';
import { ExpressConfigCallback } from './web';
import { DolittleClientBuilderCallback } from './dolittle';
import swaggerUI from 'swagger-ui-express';

export interface BackendArguments {
    graphQLResolvers?: Constructor[];
    swaggerDoc?: swaggerUI.JsonObject;

    expressCallback?: ExpressConfigCallback;
    dolittleCallback?: DolittleClientBuilderCallback;
}
