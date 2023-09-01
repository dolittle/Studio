// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const express = require('express');

const { logging, notImplemented } = require('./middlewares');

const applications = require('./api/applications');
const proxy = require('./proxy');
const logs = require('./monitoring/logs');
const metrics = require('./monitoring/metrics');

// SelfService Backend API + Router Proxy
const backend = express();
require('express-ws')(backend);
backend.use(express.json());
backend.use(logging);
backend.use(applications);
backend.use(proxy);
backend.use(notImplemented);

// Prometheus API
const prometheus = express();
prometheus.use(logging);

prometheus.use('/prometheus/api/v1', metrics);

prometheus.use(notImplemented);

// Loki API
const loki = express();
require('express-ws')(loki);
loki.use(logging);

loki.use('/loki/api/v1', logs);

loki.use(notImplemented);

// Start servers

// This does not support LiveApplications api call yet. For this to work, you need to comment out these lines:
// ApplicationsScreen.tsx - line 35 'getLiveApplications()' and 39 'setLiveApplications(values[1].applications)',
// ApplicationChanger.tsx - line 38 'getLiveApplications()' and 44 'setLiveApplications(values[2].applications)'.
backend.listen(3007, () => console.log('SelfService Backend mock listening on http://localhost:3007'));
//prometheus.listen(8801, () => console.log('Prometheus mock listening on http://localhost:8801'));
//loki.listen(8802, () => console.log('Loki mock listening on http://localhost:8802'));
