// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Router } from 'express';
import { IController } from './IController';

/**
 * Defines a system that knows about controllers.
 */
export interface IControllers {
    add(controller: IController): void
    registerRoutes(router: Router): void
}
