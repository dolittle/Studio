// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const webpack = require('@dolittle/vanir-webpack/frontend');
module.exports = (env, argv) => {
    return webpack(env, argv, '/_/data', config => {
        config.devServer.proxy = {
            '/_/data/graphql': 'http://localhost:3000',
            '/api': 'http://localhost:3000'
        };
    }, 9005, 'Studio');
};
