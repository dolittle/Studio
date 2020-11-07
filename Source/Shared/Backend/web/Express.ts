// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import { GraphQLSchema } from 'graphql';
import morgan from 'morgan';

export let app: Express;
export type ExpressConfigCallback = (app: Express) => void;

export async function initialize(prefix: string, publicPath: string, port: number, schema: GraphQLSchema, configCallback?: ExpressConfigCallback) {
    app = express();
    app.use(compression());
    app.use(express.json());

    const server = new ApolloServer({
        schema
    });
    server.applyMiddleware({ app, path: `${prefix}/graphql` });

    if (configCallback) configCallback(app);

    app.use(morgan('tiny'));
    app.use(prefix, express.static(publicPath));
    app.use((req, res) => {
        res.sendFile(`${publicPath}/index.html`);
    });

    const expressPort = process.env.PORT || port;
    app.listen({ port: expressPort, hostname: '0.0.0.0' }, () => {
        console.log(`Server is running on port ${expressPort}.`);
    });

    return app;
}
