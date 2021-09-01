// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import http from 'http';
import express, { Express } from 'express';
import { Logger } from 'winston';

import { IControllers } from './controllers';

/**
 * An HTTP server implemented with Express that hosts the API controllers.
 */
export class Server {
    private readonly _router: Express;
    private readonly _server: http.Server;

    /**
     * Creates an instance of the {@link Server} class.
     * @param _host The address to listen to.
     * @param _port The port to listen to.
     * @param _controllers The controllers to register on the server.
     * @param _logger The logger to use.
     */
    constructor(
        private readonly _host: string,
        private readonly _port: number,
        private readonly _controllers: IControllers,
        private readonly _logger: Logger
    ) {
        this._router = express();

        this._router.use(express.urlencoded({ extended: true }));
        this._router.use(express.json());

        this.logRequestsAndResponses();
        this.handleAPIRequests();
        this.handleNotFound();

        this._server = http.createServer(this._router);
    }

    /**
     * Starts the HTTP server.
     */
    async start(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._server.on('error', error => {
                this._logger.error('Failed to start HTTP server', {
                    error
                });
                reject(error);
            });

            this._server.listen(this._port, this._host, () => {
                this._logger.info(`Server is running at ${this._host} port: ${this._port}`);

                resolve();
            });
        });
    }

    private logRequestsAndResponses() {
        this._router.use((request, response, next) => {
            this._logger.info(
                `Received request to '${request.url}' method '${request.method}'`,
                {
                    url: request.url,
                    method: request.method,
                });
            response.on('finish', () => {
                this._logger.info(
                    `Response sent to url '${request.url}' with status ${response.statusCode}`,
                    {
                        url: request.url,
                        status: response.statusCode,
                    });
            });
            next();
        });
    }

    private handleAPIRequests() {
        const apiRouter = express.Router();
        this._controllers.registerRoutes(apiRouter);
        this._router.use('/api', apiRouter);
    }

    private handleNotFound() {
        this._router.use((_, response) => {
            response.status(404).json({
                message: 'Not found',
            });
        });
    }
}
