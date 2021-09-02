// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { common, microservices } from '../../api';
import { IController } from '../IController';

export type SaveMicroserviceInput = {
    dolittle: common.MicroserviceDolittle,
    name: string,
    kind: string,
    environment: string,
    extra: microservices.MicroserviceSimpleExtra
};

/**
 * A controller for handling requests related to microservices.
 */
export class MicroserviceController implements IController {

    readonly baseRoute = '/microservice';
    constructor(protected readonly _logger: Logger) { }

    /** @inheritdoc */
    registerRoutes(router: Router) {
        router.post(this.baseRoute, this.saveMicroservice.bind(this));
    }

    private saveMicroservice(req: Request, res: Response) {
        return res.status(200).json({ message: 'Microservice Saved' });
    }
}

export const createMicroserviceController = (logger: Logger) =>
    new MicroserviceController(logger);
