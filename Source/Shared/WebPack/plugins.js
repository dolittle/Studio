// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (basePath, title) => {
    return [
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
                title: title,
                baseUrl: basePath
            }
        }),
        new MiniCssExtractPlugin({
            filename: './styles.css',
        }),
    ];
};