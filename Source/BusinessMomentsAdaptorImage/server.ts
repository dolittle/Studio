// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import process from 'process';
import { RawDataProcessor } from './rawdata/processor';
import * as fsloader from './rawdata/fsloader';
import path from 'path';

export function createServer() {
    const app: Application = express();
    const transformersDir = `${path.resolve(__dirname)}/transformers`;
    const rawDataProcessor = new RawDataProcessor();
    const transformers = fsloader.loadSync(transformersDir)
    for (const transformer of transformers) {
        rawDataProcessor.AddEntityTransformer(transformer);
    }

    // Tell express to use body-parser's JSON parsing
    app.use(bodyParser.json());

    app.post('/api/webhooks-ingestor', (req: Request, res: Response) => {
        if (req.headers.authorization === process.env.WH_AUTHORIZATION) {
            const result = rawDataProcessor.Process(req.body);
            if (result.WasProcessed) {
                console.log(result.Result);
            } else {
                console.log('was not able to process payload');
            }
            res.status(200).end();
        } else {
            res.status(401).end();
        }
    });
    return app;
}

export function startServer(app: any) {
    const PORT = 3008;

    if (process.env.WH_AUTHORIZATION) {
        // if (!process.env.NODE_ENV) {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        // }
    } else {
        console.log('WH_AUTHORIZATION is not set.');
        console.log(process.env.WH_AUTHORIZATION);
        process.exit(1);
    }
}

