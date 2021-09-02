// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { IController } from '../IController';
import { allLiveApplications } from './given';

/**
 * A controller for handling requests related to applications.
 */
export class LiveApplicationsController implements IController {
    readonly baseRoute = '/live/applications';
    constructor(protected readonly _logger: Logger) { }

    /** @inheritdoc */
    registerRoutes(router: Router) {
        router.get('/', this.getAllLiveApplications.bind(this));
    }

    private getAllLiveApplications(req: Request, res: Response) {
        return res.status(200).json(allLiveApplications);
    }
}

export const createLiveApplicationsController = (logger: Logger) =>
    new LiveApplicationsController(logger);
