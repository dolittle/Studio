// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const express = require('express');

const { logging, notImplemented } = require('./middlewares');

const applications = require('./api/applications');
const logs = require('./monitoring/logs');


// SelfService Backend API
const backend = express();
backend.use(logging);

backend.use(applications);

backend.use(notImplemented);

// Loki API
const loki = express();
require('express-ws')(loki);
loki.use(logging);

loki.use('/loki/api/v1', logs);

loki.use(notImplemented);

// Start servers
backend.listen(3007, () => console.log('SelfService Backend mock listening on http://localhost:3007'));
loki.listen(8802, () => console.log('Loki mock listening on http://localhost:8802'));
