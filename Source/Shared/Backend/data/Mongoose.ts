// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import mongoose from 'mongoose';

export class Mongoose {
    static async initialize(defaultDatabaseName: string) {
        const host = process.env.DATABASE_HOST || 'localhost';
        const connectionString = `mongodb://${host}:27017/`;
        const databaseName = process.env.DATABASE_NAME || defaultDatabaseName;

        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            dbName: databaseName,
            useFindAndModify: false
        });
    }
}