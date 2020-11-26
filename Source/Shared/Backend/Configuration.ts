// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ExpressConfigCallback } from './web';
import { DolittleClientBuilderCallback } from './dolittle';
import { GraphQLSchema } from 'graphql';

export interface Configuration {
    prefix: string;
    publicPath: string;
    port: number,
    microserviceId: string;
    graphQLSchema: GraphQLSchema;
    defaultDatabaseName: string;
    defaultEventStoreDatabaseName: string;
    dolittleRuntimePort: number;

    expressCallback?: ExpressConfigCallback;
    dolittleCallback?: DolittleClientBuilderCallback;
}
