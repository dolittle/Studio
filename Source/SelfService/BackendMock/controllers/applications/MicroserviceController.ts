// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { IController } from '../IController';

/**
 * A controller for handling requests related to applications.
 */
export class MicroserviceController implements IController {
    readonly saveMicroserviceBody = {
        dolittle: {
            applicationId: 'application id',
            tenantId: 'tenant',
            microserviceId: 'microservice',
        },
        name: 'microservice name',
        kind: 'microservice kind',
        environment: 'environment',
        extra: {
            headImage: 'image',
            runtimeImage: 'image',
            ingress: {
                path: 'path',
                host: 'host',
                pathType: 'pathType',
                domainPrefix: 'domainPrefix',
            },
        },
    };
    readonly baseRoute = '/microservice';
    constructor(protected readonly _logger: Logger) {}

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
