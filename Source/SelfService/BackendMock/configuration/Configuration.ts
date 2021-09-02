// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import convict from 'convict';

/**
 * Defines the configuration.
 */
export const Configuration = convict({
    logLevel: {
        format: ['info', 'debug', 'warn', 'error'],
        doc: 'The log level',
        default: 'info',
        env: 'LOG_LEVEL',
        arg: 'log-level'
    },
    logOutputFormat: {
        format: ['prettyPrint', 'json'],
        doc: 'The log output format',
        default: 'prettyPrint',
        env: 'LOG_OUTPUT_FORMAT',
        arg: 'log-output-format'
    },
    server: {
        port: {
            format: 'port',
            doc: 'The port to listen on for the REST API',
            default: 3007,
            env: 'SERVER_PORT',
            arg: 'server-port',
        },
        host: {
            format: String,
            doc: 'The address to listen on for the REST API',
            default: '0.0.0.0',
            env: 'SERVER_HOST',
            arg: 'server-host',
        },
    },
});
