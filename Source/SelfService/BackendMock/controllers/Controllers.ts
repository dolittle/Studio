// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Request, Response } from 'express';
import { Logger } from 'winston';
import { IController } from './IController';
import { IControllers } from './IControllers';


/**
 * Represents an implementation of {@link IControllers}.
 */
export class Controllers implements IControllers {

    constructor(
        private readonly _controllers,
        private readonly _logger: Logger
    ) { }

    /** @inheritdoc */
    add(controller: IController): void {
        throw new Error('Method not implemented.');
    }
    /** @inheritdoc */
    get(route: string): IController {
        throw new Error('Method not implemented.');
    }

}

export const createControllers = (logger: Logger): IControllers => new Controllers([], logger);
