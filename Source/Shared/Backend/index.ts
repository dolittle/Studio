// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

export * as Tenant from './Tenant';

import path from 'path';
import dotenv from 'dotenv';

import * as Dolittle from '@dolittle/vanir-backend/dolittle';
import { Mongoose } from '@dolittle/vanir-backend/data';
import * as Express from '@dolittle/vanir-backend/web';


import { configureLogging } from '@dolittle/vanir-backend/Logging';
import { Configuration } from './Configuration';
import * as DependencyInversion from '@shared/dependencyinversion';

import '@dolittle/projections';

export async function startBackend(configuration: Configuration) {
    const envPath = path.resolve(process.cwd(), '.env');
    dotenv.config({ path: envPath });
    configureLogging(configuration.microserviceId);

    DependencyInversion.initialize();

    await Mongoose.initialize(configuration.defaultDatabaseName);
    await Dolittle.initialize(
        configuration.microserviceId,
        configuration.dolittleRuntimePort,
        configuration.defaultDatabaseName,
        configuration.defaultEventStoreDatabaseName,
        configuration.dolittleCallback);

    await Express.initialize(
        configuration.prefix,
        configuration.publicPath,
        configuration.port,
        configuration.graphQLSchema,
        configuration.expressCallback);
}
