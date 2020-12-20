// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor } from '@dolittle/types';
import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import { Configuration } from '../Configuration';
import { logger } from '../logging';
import { getSchemaFor } from '../data';
import swaggerUI from 'swagger-ui-express';

export let app: Express;
export type ExpressConfigCallback = (app: Express) => void;

export async function initialize(configuration: Configuration, graphQLResolvers: Constructor[] = [], swaggerDoc?: swaggerUI.JsonObject, configCallback?: ExpressConfigCallback) {
    const prefix = `${configuration.isRooted ? '' : '/_'}/${configuration.routeSegment}`;

    app = express();
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms') as any);
    app.use(compression());
    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );
    app.use(bodyParser.json());

    const server = new ApolloServer({
        schema: await getSchemaFor(graphQLResolvers)
    });
    server.applyMiddleware({ app, path: `${prefix}/graphql` });

    if (swaggerDoc) {
        const swaggerPath = `/api/${configuration.routeSegment}/swagger`;
        logger.info(`Hosting swagger at '${swaggerPath}'`);
        app.use(
            swaggerPath,
            swaggerUI.serve,
            swaggerUI.setup(swaggerDoc, {}, {})
        );
    }

    configCallback?.(app);

    app.use(prefix, express.static(configuration.publicPath));
    app.use((req, res) => {
        const indexPath = path.resolve(configuration.publicPath, 'index.html');
        res.sendFile(indexPath);
    });

    const expressPort = process.env.PORT || configuration.port;

    logger.info(`Express will be listening to port '${expressPort}'`);
    app.listen({ port: expressPort, hostname: '0.0.0.0' }, () => {
        logger.info(`Server is now running on http://localhost:${expressPort}`);
    });

    return app;
}
