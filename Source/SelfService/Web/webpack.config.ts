// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

// const webpack = require('@dolittle/vanir-webpack/frontend');
// module.exports = (env, argv) => {
//     return webpack(env, argv, '/selfservice', config => {
//         config.devServer.proxy = {
//             '/selfservice/api': {
//                 target: 'http://localhost:3007',
//                 pathRewrite: { '^/selfservice/api': '' },
//             }
//         };
//         config.devServer.before = (app, server, compiler) => { };
//     }, 9007, 'Studio');
// };


import { Configuration } from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import { webpack as config } from '@shared/web';

/**
 * Fixes the usage of the 'deasync' library so that it can be bundled with WebPack.
 * @param config The WebPack configuration to modify.
 */
const handleDeasyncNativeLibraryLoading = (config: Configuration) => {
    config.ignoreWarnings?.push({
        module: /node_modules\/deasync/,
        message: /the request of a dependency is an expression/,
    });
    // config.plugins?.push(new CopyPlugin({
    //     patterns: [
    //         {
    //             from: '../../../../node_modules/deasync/bin',
    //             to: 'node_modules/deasync/bin',
    //         }
    //     ]
    // }));
};

export default config(config => {
    handleDeasyncNativeLibraryLoading(config);
});
