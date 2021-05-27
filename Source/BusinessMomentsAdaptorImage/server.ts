// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import process from 'process';
import * as dataController from './dataController';
import rawData from './dataschema';

export function createServer() {
    const app: Application = express();

    // Tell express to use body-parser's JSON parsing.
    app.use(bodyParser.json());

    app.post('/api/webhooks-ingestor', (req: Request, res: Response) => {
        if (req.headers.authorization !== process.env.WH_AUTHORIZATION) {
            res.status(401).end();
        }

        console.log(req.body);

        try {
            savePayload(req.body);
        } catch (_) {
            res.status(500).end();
        }
        res.status(200).end();
    });

    app.get('/data', dataController.allData);
    app.get('/data/:id', dataController.getData);

    return app;
}

function savePayload(payload: any) {
    const data = new rawData(payload);
    data.save();
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


