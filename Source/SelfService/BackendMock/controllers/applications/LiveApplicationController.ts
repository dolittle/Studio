// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { IController } from '../IController';
import { allMicroservicesInLiveApplication, podStatus } from './given';

/**
 * A controller for handling requests related to applications.
 */
export class LiveApplicationController implements IController {
    readonly podLogs = {
        applicationId: '11b6cf47-5d9f-438f-8116-0d9828654657',
        microserviceId: 'TODO',
        podName: 'dev-rawdatalogingestor-6dd8999646-dnsl7',
        logs: '',
    };
    readonly baseRoute = '/live/application';
    constructor(protected readonly _logger: Logger) {}

    /** @inheritdoc */
    registerRoutes(router: Router) {
        router.get(this.baseRoute, this.test.bind(this));
        router.get(
            `${this.baseRoute}/:applicationID/microservices`,
            this.getAllMicroservices.bind(this)
        );
        router.get(
            `${this.baseRoute}/:applicationID/environment/:environment/microservice/:microserviceid/podstatus`,
            this.getPodStatus.bind(this)
        );
        router.get(
            `${this.baseRoute}/:applicationID/pod/:podname/logs`,
            this.getPodLogs.bind(this)
        );
    }

    private test(req: Request, res: Response) {
        return res.status(200).json({ message: 'Hello World' });
    }
    private getAllMicroservices(req: Request, res: Response) {
        return res.status(200).json(allMicroservicesInLiveApplication);
    }
    private getPodStatus(req: Request, res: Response) {
        return res.status(200).json(podStatus);
    }
    private getPodLogs(req: Request, res: Response) {
        return res.status(200).json(this.podLogs);
    }
}

export const createLiveApplicationController = (logger: Logger) =>
    new LiveApplicationController(logger);
