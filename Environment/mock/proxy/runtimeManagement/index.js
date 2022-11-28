// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { Router } = require('express');
const routes = module.exports = Router({ mergeParams: true });
const { ToTextResponse } = require('@botchris/grpc-web-mock');
const client = require('./client');

routes.get('/*', (req, res) => {
    console.log('Getting RUntime Management Proxy');
    res.status(200).end();
})

routes.use('/dolittle.runtime.client.management.Client', client);

