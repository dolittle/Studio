// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import output from './output';
import optimization from './optimization';
import resolve from './resolve';
import rules from './rules';
import plugins from './plugins';
import devServer from './devServer';

export const webpack = (env, argv, basePath, callback, port, title) => {
    const production = argv.mode === 'production';
    basePath = basePath || '/';
    title = title || 'Dolittle Studio';
    const config = {
        entry: './index.tsx',
        target: 'web',
        output: output(env, argv, basePath),
        optimization,
        resolve,
        module: {
            rules
        },
        plugins: plugins(basePath, title),
        devtool: production ? false : 'inline-source-map',
        devServer: devServer(basePath, port)
    };

    if (callback) {
        callback(config);
    }

    return config;
};
