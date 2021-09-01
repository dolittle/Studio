// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { IController } from './IController';

/**
 * A controller for handling request for fetching purchase orders.
 */
export class Controller implements IController {
    readonly baseRoute = '/test';
    constructor(
        protected readonly _logger: Logger
    ) { }

    /** @inheritdoc */
    registerRoutes(router: Router) {
        // router.get('/purchaseorders', this._controller.getAllBySupplierId.bind(this._controller));
        router.get(this.baseRoute, test.bind(this));
    }

    private test(req: Request, res: Response) {
        return res.status(200).json({ message: 'Hello World' });
    }

}

export const createController = (logger: Logger) => new Controller(logger);
