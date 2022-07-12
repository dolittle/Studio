// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import path from 'path';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { HtmlInterceptorPlugin } = require('./HtmlInterceptorPlugin');
const CopyPlugin = require('copy-webpack-plugin');

export default (basePath, title) => {
    return [
        new ForkTsCheckerWebpackPlugin(),

        new CleanWebpackPlugin({
            dangerouslyAllowCleanPatternsOutsideProject: true,
            dry: false,
            cleanStaleWebpackAssets: false,
            cleanOnceBeforeBuildPatterns: ['**/*.*']
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), 'index.ejs'),
            templateParameters: {

            },
            publicPath: basePath,
            metadata: {
                title,
                baseUrl: basePath
            },
        }),

        new CopyPlugin({
            patterns: [
                {
                    from: './assets/favicons/apple-touch-icon.png',
                    to: './assets/favicons/'
                },
                {
                    from: './assets/favicons/google-touch-icon.png',
                    to: './assets/favicons/'
                },
                {
                    from: './assets/favicons/favicon.svg',
                    to: './assets/favicons/'
                },
                {
                    from: './assets/favicons/safary-mask-icon.svg',
                    to: './assets/favicons/'
                },
                { from: 'favicon.ico', },
            ]
        }),

        new HtmlInterceptorPlugin({}),
        new MiniCssExtractPlugin({
            filename: './styles.css',
        }),
    ];
};
