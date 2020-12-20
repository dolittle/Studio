// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

export * as Tenant from './Tenant';

import path from 'path';
import dotenv from 'dotenv';

import * as Dolittle from '@shared/backend/dolittle';
import { Mongoose } from '@shared/backend/data';
import * as Express from '@shared/backend/web';
import { Bindings as K8sBindings} from '@shared/backend/k8s';

export { logger } from './logging';

import { Configuration } from './Configuration';
import * as DependencyInversion from '@shared/dependencyinversion';

import '@dolittle/projections';
import { BackendArguments } from './BackendArguments';
import { container } from 'tsyringe';

export async function startBackend(startArguments: BackendArguments) {
    const envPath = path.resolve(process.cwd(), '.env');
    dotenv.config({ path: envPath });
    const configuration = Configuration.create();

    DependencyInversion.initialize();
    K8sBindings.initialize();

    container.registerInstance(Configuration, configuration);

    await Mongoose.initialize(configuration);
    await Dolittle.initialize(configuration, startArguments.dolittleCallback);
    await Express.initialize(configuration, startArguments.graphQLResolvers, startArguments.swaggerDoc, startArguments.expressCallback);
}
