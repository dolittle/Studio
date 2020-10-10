// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const webpack = require('@shared/webpack');
module.exports = (env, argv) => {
    return webpack(env, argv, '/events', config => {
        config.devServer.port = 9002;
    });
};