// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import { GraphQLSchema } from 'graphql';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';

export let app: Express;
export type ExpressConfigCallback = (app: Express) => void;

export async function initialize(prefix: string, publicPath: string, port: number, schema: GraphQLSchema, configCallback?: ExpressConfigCallback) {
    app = express();
    app.use(compression());
    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );
    app.use(bodyParser.json());

    const server = new ApolloServer({
        schema,
        context: ({ req }) => {
            return {
                userId: req.header('User-ID'),
                tenantId: req.header('Tenant-Id'),
                cookies: req.header('Cookie'),
            };
        }
    });
    server.applyMiddleware({ app, path: `${prefix}/graphql` });

    if (configCallback) configCallback(app);

    app.use(morgan('tiny'));
    app.use(prefix, express.static(publicPath));
    app.use((req, res) => {
        const indexPath = path.resolve(publicPath, 'index.html');
        res.sendFile(indexPath);
    });

    const expressPort = process.env.PORT || port;
    app.listen({ port: expressPort, hostname: '0.0.0.0' }, () => {
        console.log(`Server is running on port ${expressPort}.`);
    });

    return app;
}
