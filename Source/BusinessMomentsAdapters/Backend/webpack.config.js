// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const webpack = require('@dolittle/vanir-webpack/backend');

module.exports = (env, argv) => {
    return webpack(env, argv, config => { });
};
