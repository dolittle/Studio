// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { createLogger, format, transports } from 'winston';
import { printHelpOrValidationError, Configuration } from './configuration';
import { createControllers } from './controllers';
import { Server } from './server';

printHelpOrValidationError();

const formatFunc = Configuration.get('logOutputFormat');
const logger = createLogger({
    level: Configuration.get('logLevel'),
    format: format[formatFunc](),
    transports: [
        new transports.Console({
            format: format[formatFunc](),
        }),
    ],
});


logger.info('The configuration', JSON.parse(Configuration.toString()));

const server = new Server(
    Configuration.get('server.host'),
    Configuration.get('server.port'),
    createControllers(logger),
    logger
);

server.start();
