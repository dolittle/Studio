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
        if (req.headers.authorization === process.env.WH_AUTHORIZATION) {
            console.log(req.body);

            const data = new rawData(req.body);
            try {
                data.save();
            } catch (error) {
                res.send(error);
                res.status(500).end();
            }
            res.status(200).end();
        } else {
            res.status(401).end();
        }
    });

    app.get('/data', dataController.allData);
    app.get('/data/:id', dataController.getData);

    return app;
}

export function startServer(app: any) {
    const PORT = 3008;

    if (process.env.WH_AUTHORIZATION) {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } else {
        console.log('WH_AUTHORIZATION is not set.');
        console.log(process.env.WH_AUTHORIZATION);
        process.exit(1);
    }
}
