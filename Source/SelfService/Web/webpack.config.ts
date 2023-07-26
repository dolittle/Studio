// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import path from 'path';
import webpackImported from 'webpack';

import TerserPlugin from 'terser-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';

type Args = { [key: string]: string };

const basePath = '/selfservice/';
const title = 'Dolittle Studio';
const defaultPort = 9007;

function webpack(env: Args, argv: Args) {
    const isProduction = argv.mode === 'production';
    const port = process.env.port || argv.port || defaultPort;

    return {
        mode: isProduction ? 'production' : 'development',
        entry: './index.tsx' as any,
        target: 'web',
        output: {
            filename: isProduction
                ? '[name].[chunkhash].bundle.js'
                : '[name].[contenthash].bundle.js',
            sourceMapFilename: isProduction
                ? '[name].[chunkhash].bundle.map'
                : '[name].[contenthash].bundle.map',
            chunkFilename: isProduction
                ? '[name].[chunkhash].chunk.js'
                : '[name].[contenthash].chunk.js',
            path: path.resolve(process.cwd(), 'wwwroot'),
            publicPath: basePath,
        },
        resolve: {
            extensions: ['.js', '.json', '.ts', '.tsx'],
        },
        module: {
            rules: [
                {
                    test: /\.[tj]s[x]*$/i,
                    exclude: /(node_modules)/,
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: false,
                        projectReferences: true,
                        allowTsInNodeModules: true,
                    },
                },
                {
                    test: /\.(png|gif|jpg|cur)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.svg$/,
                    exclude: /node_modules/,
                    issuer: /\.tsx?$/,
                    resourceQuery: { not: /url/ },
                    loader: '@shared/web/svgr/loader',
                },
                {
                    test: /\.svg$/,
                    exclude: /node_modules/,
                    resourceQuery: /url/,
                    type: 'asset/resource',
                },
                {
                    test: /\.(scss|css)$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
            ],
        },
        devtool: isProduction ? false : 'inline-source-map',
        devServer: {
            historyApiFallback: { index: basePath },
            host: '0.0.0.0',
            port,
            publicPath: basePath,
            contentBase: process.cwd(),
            proxy: {
                '/selfservice/api': {
                    target: 'http://localhost:3007',
                    pathRewrite: { '^/selfservice/api': '' },
                },
                '/api/system/monitoring/metrics/v1/': {
                    target: 'http://localhost:8801',
                    pathRewrite: { '^/api/system/monitoring/metrics/v1/': '/prometheus/api/v1/' },
                    headers: {
                        'x-scope-orgid': 'tenant-453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
                    },
                },
                '/api/system/monitoring/logs/v1/': {
                    target: 'http://localhost:8802',
                    pathRewrite: { '^/api/system/monitoring/logs/v1/': '/loki/api/v1/' },
                    headers: {
                        'x-scope-orgid': 'tenant-453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
                    },
                    ws: true,
                },
                '/proxy': {
                    target: 'http://localhost:3007',
                    ws: true,
                },
            },
            before: (app, server, compiler) => {
                app.get(['/', '/.auth/*'], function (req, res) {
                    res.redirect(basePath);
                });
            },
        },
        plugins: [
            new CleanWebpackPlugin({
                dangerouslyAllowCleanPatternsOutsideProject: true,
                dry: false,
                cleanStaleWebpackAssets: false,
                cleanOnceBeforeBuildPatterns: ['**/*.*'],
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(process.cwd(), 'index.ejs'),
                templateParameters: {},
                publicPath: basePath,
                metadata: {
                    title,
                    baseUrl: basePath,
                },
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: './assets/favicons/apple-touch-icon.png',
                        to: './assets/favicons/',
                    },
                    {
                        from: './assets/favicons/google-touch-icon.png',
                        to: './assets/favicons/',
                    },
                    {
                        from: './assets/favicons/favicon.svg',
                        to: './assets/favicons/',
                    },
                    {
                        from: './assets/favicons/safary-mask-icon.svg',
                        to: './assets/favicons/',
                    },
                    { from: 'favicon.ico' },
                ]
            }),
            new MiniCssExtractPlugin({
                filename: './styles.css',
            }),
            new webpackImported.DefinePlugin({
                'process.env.MUI_LICENSE_KEY': JSON.stringify(process.env.MUI_LICENSE_KEY)
            }),
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        sourceMap: false,
                        // We want the class names and function names to be there for the IoC to work its magic
                        keep_classnames: true,
                        keep_fnames: true,
                    },
                }),
            ],
            runtimeChunk: true,
            splitChunks: {
                chunks: 'initial',
                // Sizes are compared against source before minification
                maxSize: 200000, // Splits chunks if bigger than 200k, adjust as required (maxSize added in webpack v4.15)
                cacheGroups: {
                    default: false, // Disable the built-in groups default & vendors (vendors is redefined below)
                    // This is the HTTP/1.1 optimised cacheGroup configuration
                    vendors: {
                        // Picks up everything from node_modules as long as the sum of node modules is larger than minSize
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        priority: 19,
                        enforce: true, // Causes maxInitialRequests to be ignored, minSize still respected if specified in cacheGroup
                        minSize: 30000, // Use the default minSize
                    },
                    vendorsAsync: {
                        // Vendors async chunk, remaining asynchronously used node modules as single chunk file
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors.async',
                        chunks: 'async',
                        priority: 9,
                        reuseExistingChunk: true,
                        minSize: 10000, // Use smaller minSize to avoid too much potential bundle bloat due to module duplication.
                    },
                    commonsAsync: {
                        // Commons async chunk, remaining asynchronously used modules as single chunk file
                        name: 'commons.async',
                        minChunks: 2, // Minimum number of chunks that must share a module before splitting
                        chunks: 'async',
                        priority: 0,
                        reuseExistingChunk: true,
                        minSize: 10000, // Use smaller minSize to avoid too much potential bundle bloat due to module duplication.
                    },
                },
            },
        },
    };
};

export default webpack;
