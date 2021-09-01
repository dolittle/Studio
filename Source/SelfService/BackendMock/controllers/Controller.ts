// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Request, Response } from 'express';
import { Logger } from 'winston';
import { IController } from './IController';

/**
 * A controller for handling request for fetching purchase orders.
 */
export class Controller implements IController {
    readonly baseRoute = '/something';
    constructor(
        protected readonly _logger: Logger
    ) { }

}

export const createController = (logger: Logger) => new Controller(logger);
