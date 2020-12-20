// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Configuration } from '../Configuration';
import mongoose from 'mongoose';
import { logger } from '../logging';

export class Mongoose {
    static async initialize(configuration: Configuration) {
        const connectionString = `mongodb://${configuration.database.host}:${configuration.database.port}/`;
        const databaseName = configuration.database.name;

        logger.info(`Using '${connectionString}${databaseName}' for Mongoose`);

        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            dbName: databaseName,
            useFindAndModify: false
        });
    }
}