// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const webpack = require('@dolittle/vanir-webpack/frontend');
module.exports = (env, argv) => {
    return webpack(env, argv, '/', config => {
        config.devServer.port = 9100;
    }, 'Dolittle Studio DevTool');
};