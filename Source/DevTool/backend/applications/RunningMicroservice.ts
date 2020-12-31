// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Microservice } from '@dolittle/vanir-common';
import { IRunningInstance } from './IRunningInstance';

export class RunningMicroservice {
    constructor(readonly microservice: Microservice, readonly runtime: IRunningInstance, readonly backend: IRunningInstance, readonly web: IRunningInstance) {
    }
}
