// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IApplicationLog } from '../common';
import { Interop } from './Interop';
import { IApplicationLogToken } from '../common/IApplicationLog';
import { injectable } from 'tsyringe';

@injectable()
export class ApplicationLogProxy implements IApplicationLog {

    constructor(private readonly _interop: Interop) {
    }

    start(): Promise<void> {
        return this._interop.invoke(IApplicationLogToken, 'start');
    }

    stop(): Promise<void> {
        return this._interop.invoke(IApplicationLogToken, 'stop');
    }
}
