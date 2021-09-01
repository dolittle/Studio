// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Router } from 'express';

/**
 * Defines a controller.
 */
export interface IController {
    readonly baseRoute: string
    registerRoutes(router: Router): void
}

