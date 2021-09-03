// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { IController } from '../IController';
import {
    allMicroservicesInApplication,
    environmentsAndMicroservicesInApplication,
} from './given';

/**
 * A controller for handling requests related to applications.
 */
export class ApplicationController implements IController {
    readonly baseRoute = '/application';
    constructor(protected readonly _logger: Logger) { }

    /** @inheritdoc */
    registerRoutes(router: Router) {
        router.get(
            '/:applicationID',
            this.getEnvironmentsAndMicroservices.bind(this)
        );
        router.get(
            '/:applicationID/microservices',
            this.getAllMicroservices.bind(this)
        );
        router.delete(
            '/:applicationID/environment/:environment/microservice/:microserviceID',
            this.deleteMicroservice.bind(this)
        );
    }

    private getAllMicroservices(req: Request, res: Response) {
        return res.status(200).send(allMicroservicesInApplication);
    }
    private getEnvironmentsAndMicroservices(req: Request, res: Response) {
        return res.status(200).json(environmentsAndMicroservicesInApplication);
    }
    private deleteMicroservice(req: Request, res: Response) {
        return res.status(200).json({ message: 'Microservice Deleted' });
    }
}

export const createApplicationController = (logger: Logger) =>
    new ApplicationController(logger);
