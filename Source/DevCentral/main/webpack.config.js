// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const path = require('path');
const webpack = require('@dolittle/vanir-webpack/backend');
const wp = require('webpack');

module.exports = (env, argv) => {
    return webpack(env, argv, config => {
        config.target = 'electron-main';
        config.output.path = path.resolve(process.cwd(), '..', 'build');
    });
};
