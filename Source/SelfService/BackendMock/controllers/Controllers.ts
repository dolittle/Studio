// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Router } from 'express';
import { Logger } from 'winston';
import { createApplicationController } from './applications/ApplicationController';
import { createApplicationsController } from './applications/ApplicationsController';
import { IController } from './IController';
import { IControllers } from './IControllers';
import { MultipleControllersForBaseRoute } from './MultipleControllersForBaseRoute';
import { createMicroserviceController } from './microservices/MicroserviceController';
import { createLiveApplicationsController } from './liveApplications/LiveApplicationsController';
import { createLiveApplicationController } from './liveApplications/LiveApplicationController';

/**
 * Represents an implementation of {@link IControllers}.
 */
export class Controllers implements IControllers {
    constructor(
        private readonly _controllers: IController[],
        private readonly _logger: Logger
    ) { }

    /** @inheritdoc */
    add(controller: IController): void {
        this._controllers.push(controller);
    }

    /** @inheritdoc */
    registerRoutes(router: Router): void {
        this.throwIfMultipleControllersWithSameBaseRoute();
        this._controllers.forEach((controller) => controller.registerRoutes(router));
    }

    private throwIfMultipleControllersWithSameBaseRoute() {
        const routes = this._controllers.map((_) => _.baseRoute);
        routes.forEach((route) => {
            if (routes.filter((routeToCheck) => routeToCheck === route).length > 1) {
                throw new MultipleControllersForBaseRoute(route);
            }
        });
    }
}

export const createControllers = (logger: Logger): IControllers =>
    new Controllers(
        [
            createApplicationsController(logger),
            createApplicationController(logger),
            createLiveApplicationsController(logger),
            createLiveApplicationController(logger),
            createMicroserviceController(logger),
        ],
        logger
    );
