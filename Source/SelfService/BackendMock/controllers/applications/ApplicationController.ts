// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { IController } from '../IController';

/**
 * A controller for handling requests related to applications.
 */
export class ApplicationController implements IController {
    readonly baseRoute = '/application';
    constructor(
        protected readonly _logger: Logger
    ) { }

    /** @inheritdoc */
    registerRoutes(router: Router) {
        router.get(this.baseRoute, this.test.bind(this));
        router.get(`${this.baseRoute}/:applicationID`, this.get.bind(this));
        router.get(`${this.baseRoute}/:applicationID/microservices`, this.getAllMicroservices.bind(this));
    }

    private test(req: Request, res: Response) {
        return res.status(200).json({ message: 'Hello World' });
    }
    private getAllMicroservices(req: Request, res: Response) {
        return res.status(200).json({ microservice: 'your microservices' });
    }
    private get(req: Request, res: Response) {
        return res.status(200).json({ application: 'your appliction' });
    }
}

export const createApplicationController = (logger: Logger) => new ApplicationController(logger);
