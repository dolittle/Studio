// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { IController } from './IController';

/**
 * A test controller
 */
export class TestController implements IController {
    readonly baseRoute = '/test';
    constructor(
        protected readonly _logger: Logger
    ) { }

    /** @inheritdoc */
    registerRoutes(router: Router) {
        // selfservice/api/test => test(req, res) => {message: "Hello world"}
        router.get(this.baseRoute, this.test.bind(this));
    }

    private test(req: Request, res: Response) {
        return res.status(200).json({ message: 'Hello World' });
    }

}
