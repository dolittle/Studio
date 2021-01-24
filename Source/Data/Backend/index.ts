// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';
import { Host } from '@dolittle/vanir-backend';
import { RegisterRoutes } from './routes';
import queries from './queries';
import { Bindings as K8sBindings } from '@shared/k8s';
const swaggerDoc = require('./swagger.json');

(async () => {
    await Host.start({
        swaggerDoc,
        graphQLResolvers: queries,
        expressCallback: (app) => {
            RegisterRoutes(app);
            K8sBindings.initialize();
        }
    });
})();
