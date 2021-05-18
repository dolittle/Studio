import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import process from 'process';


export function createServer() {
    const app: Application = express();

    // Tell express to use body-parser's JSON parsing
    app.use(bodyParser.json());

    app.post('/api/webhooks-ingestor', (req: Request, res: Response) => {
        if (req.headers.authorization === process.env.WH_AUTHORIZATION) {
            console.log(req.body);
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

