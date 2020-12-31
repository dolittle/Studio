// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application, Microservice } from '@dolittle/vanir-common';
import { IRunningInstance } from './IRunningInstance';

export class RunningTypescriptBackend implements IRunningInstance {
    constructor(application: Application, microservice: Microservice) {
    }

    async getLogs(): Promise<NodeJS.ReadableStream> {
        throw new Error('Not implemented');
    }
}
