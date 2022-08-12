// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { template as SvgrTemplate } from '../svgr/template';
import path from 'path';

export default [
    {
        test: /\.[tj]s[x]*$/i,
        exclude: /(node_modules)/,
        loader: 'ts-loader',
        options: {
            transpileOnly: true,
            projectReferences: true,
            allowTsInNodeModules: true
        }
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
        loader: '@svgr/webpack',
        options: {
            jsx: {
                babelConfig: {
                    plugins: [ path.resolve(__dirname, '..', 'svgr', 'convert-svg-to-box-plugin.js') ],
                },
            },
            template: SvgrTemplate,
        },
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
];
