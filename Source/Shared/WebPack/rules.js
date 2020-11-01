// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

module.exports = [
    {
        test: /\.[tj]s[x]*$/i,
        exclude: /(node_modules)/,
        loader: 'ts-loader'
    },
    {
        test: /\.s[ac]ss$/i,
        issuer: /\.[tj]s[x]*$/i,
        use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
        ],
    },
    {
        test: /\.(png|gif|jpg|cur)$/i,
        loader: 'url-loader',
        options: { limit: 8192 }
    },
];