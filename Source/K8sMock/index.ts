// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { startBackend } from '@dolittle/vanir-backend';
import { RegisterRoutes } from './routes';
const swaggerDoc = require('./swagger.json');

(async () => {
    await startBackend({
        swaggerDoc,
        expressCallback: _ => {
            RegisterRoutes(_);
        },
    });
})();
