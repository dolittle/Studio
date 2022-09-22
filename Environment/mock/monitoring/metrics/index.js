// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { Router, query } = require('express');
const { queryRange } = require('./generated');

const routes = module.exports = Router();
require('express-ws')(routes);

const parseQuery = (query) => {
    const parsed = {
    };

    return parsed;
}

routes.get('/query_range', (req, res) => {
    console.log('Getting metrics');
    const query = parseQuery(req.query.query);
    const result = queryRange(query, BigInt(req.query.start), BigInt(req.query.end), parseInt(req.query.limit), req.query.direction);
    global.setTimeout(() => {
        res.status(200).json(result).end();
    }, 0);
});
