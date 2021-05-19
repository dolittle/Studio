// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const webpack = require('@dolittle/vanir-webpack/frontend');
module.exports = (env, argv) => {
    return webpack(env, argv, '/_/selfservice', config => {
        config.devServer.proxy = {
            '/_/selfservice/api': {
                target: 'http://localhost:3007',
                pathRewrite: { '^/_/selfservice/api': '' },
            }
        };
        config.devServer.before = (app, server, compiler) => { };
    }, 9007, 'Studio');
};
