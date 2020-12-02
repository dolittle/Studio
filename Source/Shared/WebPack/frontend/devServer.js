// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

module.exports = (basePath) => {
    return {
        historyApiFallback: true,
        host: '0.0.0.0',
        port: 8080,
        publicPath: basePath,
        contentBase: process.cwd(),
        proxy: {
            '/api': 'http://localhost:3000',
            '/graphql': 'http://localhost:3000',
        }
    };
};