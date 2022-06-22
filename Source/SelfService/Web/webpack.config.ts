// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const webpack = require('@shared/web').webpack;
module.exports = (env, argv) => {
    return webpack(env, argv, '/selfservice/', config => {
        config.devServer.proxy = {
            '/selfservice/api': {
                target: 'http://localhost:3007',
                pathRewrite: { '^/selfservice/api': '' },
            },
            '/api/system/monitoring/metrics/v1/': {
                target: 'http://localhost:8801',
                pathRewrite: { '^/api/system/monitoring/metrics/v1/': '/prometheus/api/v1/' },
                headers: {
                    'x-scope-orgid': 'tenant-453e04a7-4f9d-42f2-b36c-d51fa2c83fa3'
                }
            },
            '/api/system/monitoring/logs/v1/': {
                target: 'http://localhost:8802',
                pathRewrite: { '^/api/system/monitoring/logs/v1/': '/loki/api/v1/' },
                headers: {
                    'x-scope-orgid': 'tenant-453e04a7-4f9d-42f2-b36c-d51fa2c83fa3'
                },
                ws: true,
            },
        };
        config.devServer.before = (app, server, compiler) => { };
    }, 9007, 'Dolittle Studio');
};
