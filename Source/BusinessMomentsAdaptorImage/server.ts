// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import process from 'process';
import { IRawDataStorage } from './RawDataStorage';
import { RawDataProcessor } from './rawdata/processor';
import path from 'path';
import * as fsloader from './rawdata/fsloader';

export function createServer(rawDataStorage: IRawDataStorage) {
    const app: Application = express();
    const repo = rawDataStorage;
    let transformersDir = `${path.resolve(__dirname)}/transformers`;
    if (process.env.TRANSFORMERS_PATH) {
        transformersDir = process.env.TRANSFORMERS_PATH;
    }
    const rawDataProcessor = new RawDataProcessor();
    const transformers = fsloader.loadSync(transformersDir)
    for (const transformer of transformers) {
        rawDataProcessor.AddEntityTransformer(transformer);

        // Tell express to use body-parser's JSON parsing.
        app.use(bodyParser.json());

        app.post('/api/webhooks-ingestor', async (req: Request, res: Response) => {
            // TODO: figure out how we do this with middleware (less duplication)
            if (!isAuthorized(req)) {
                res.status(401).end();
                return;
            }

            try {
                const result = rawDataProcessor.Process(req.body);
                if (result.WasProcessed) {
                    await repo.Append(req.body);
                    //console.log(req.body);
                    console.log(result.Result);
                } else {
                    console.log('was not able to process payload');
                }

            } catch (err) {
                console.log(err);
                res.status(500).end();
            }
            res.status(200).end();
        });

        app.get('/api/webhooks-ingestor/data', async (req: Request, res: Response) => {
            if (!isAuthorized(req)) {
                res.status(401).end();
                return;
            }

            try {
                const result = await repo.GetAll();
                res.send(result).end();
            } catch (err) {
                console.log(err);
                res.status(500).end();
            }
        });

        app.get('/api/webhooks-ingestor/data/:id', async (req: Request, res: Response) => {
            if (!isAuthorized(req)) {
                res.status(401).end();
                return;
            }

            try {
                const result = await repo.GetById(req.params.id);
                res.send(result).end();
            } catch (_) {
                res.status(500).end();
            }
        });

        return app;
    }
}

function isAuthorized(req: Request) {
    return req.headers.authorization === process.env.WH_AUTHORIZATION;
}

export function startServer(app: any) {
    const PORT = 3008;

    failIfEnvironmentVariableIsNotSet('WH_AUTHORIZATION');
    failIfEnvironmentVariableIsNotSet('MONGODB_URI');

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

function failIfEnvironmentVariableIsNotSet(name: string) {
    if (!process.env[name]) {
        console.log(`${name} is not set.`);
        process.exit(1);
    }
}
