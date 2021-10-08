// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

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
        test: /\.svg/,
        type: 'asset/inline'
    },
    {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
    },
];
