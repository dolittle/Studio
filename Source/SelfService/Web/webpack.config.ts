// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const webpack = require('@shared/web').webpack;
module.exports = (env, argv) => {
    return webpack(env, argv, '/selfservice', config => {
        config.devServer.proxy = {
            '/selfservice/api': {
                target: 'http://localhost:3007',
                pathRewrite: { '^/selfservice/api': '' },
            }
        };
        config.devServer.before = (app, server, compiler) => { };
    }, 9007, 'Studio');
};
