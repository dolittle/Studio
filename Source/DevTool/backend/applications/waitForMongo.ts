// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ILogger } from '@dolittle/vanir-backend';
import { MongoClient } from 'mongodb';

/* eslint-disable no-restricted-globals */
export function waitForMongo(logger: ILogger): Promise<void> {
    return new Promise(async (resolve) => {
        logger.info('Wait for mongo to become ready');

        const timeout = setTimeout(() => {
            logger.info('Timed out waiting for mongo to become ready');
            clearInterval(interval);
            resolve();
        }, 20000);

        const interval = setInterval(async () => {
            try {
                const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
                process.stdout.write('\n');
                logger.info('Mongo is ready');
                client.close();
                clearInterval(interval);
                clearTimeout(timeout);
                resolve();
            } catch (ex) {
                process.stdout.write('.');
            }
        }, 1000);

    });
}
