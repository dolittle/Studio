// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

export * as Tenant from './Tenant';

import path from 'path';
import dotenv from 'dotenv';

import * as Dolittle from '@shared/backend/dolittle';
import { Mongoose } from '@shared/backend/data';
import * as Express from '@shared/backend/web';

import { configureLogging } from '@shared/backend/logging/Logging';
import { Configuration } from './Configuration';
import * as DependencyInversion from '@shared/dependencyinversion';

import './projections';

export async function startBackend(configuration: Configuration) {
    const envPath = path.resolve(process.cwd(), '.env');
    dotenv.config({ path: envPath });
    configureLogging(configuration.microserviceId);

    DependencyInversion.initialize();

    await Mongoose.initialize(configuration.defaultDatabaseName);
    await Dolittle.initialize(configuration.microserviceId, configuration.dolittleRuntimePort, configuration.dolittleCallback);
    await Express.initialize(
        configuration.prefix,
        configuration.publicPath,
        configuration.port,
        configuration.graphQLSchema,
        configuration.expressCallback);
}
