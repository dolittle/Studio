// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

// https://stackoverflow.com/questions/53801293/webpack-4-cant-find-package-json-in-production-mode
// https://blog.webbylab.com/minimal_size_docker_image_for_your_nodejs_app/


module.exports = (env, argv, callback) => {
    const production = argv.mode === 'production';

    const config = {
        devtool: false,
        mode: argv.mode || 'production',
        target: 'node',
        entry: './index.ts',
        optimization: {
            minimize: false
            /*
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        cache: true,
                        parallel: true,
                        sourceMap: false,

                        // We want the class names and function names to be there for the IoC to work its magic
                        keep_classnames: true,
                        keep_fnames: true
                    }
                })
            ],*/
        },
        output: {
            path: path.resolve(process.cwd(), 'dist'),
            filename: 'index.js',
            libraryTarget: 'commonjs'
        },
        resolve: {
            enforceModuleExtension: false,
            extensions: ['.mjs', '.js', '.json', '.ts'],
            plugins: [
                new TsconfigPathsPlugin()
            ]
        },
        module: {
            rules: [
                {
                    test: /\.[tj]s$/i,
                    exclude: /(node_modules)/,
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        projectReferences: true,
                        allowTsInNodeModules: true
                    }
                }
            ]
        },
        plugins: [
            new webpack.ProgressPlugin()
        ]
    };

    if (callback) {
        callback(config);
    }

    return config;
};
