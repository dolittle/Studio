// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { IController } from '../IController';

/**
 * A controller for handling requests related to applications.
 */
export class LiveApplicationsController implements IController {
    readonly baseRoute = '/live/applications';
    constructor(
        protected readonly _logger: Logger
    ) { }

    /** @inheritdoc */
    registerRoutes(router: Router) {
        router.get(this.baseRoute, this.test.bind(this));
    }

    private test(req: Request, res: Response) {
        return res.status(200).json({ message: 'Hello World Live' });
    }
}

export const createLiveApplicationsController = (logger: Logger) => new LiveApplicationsController(logger);
