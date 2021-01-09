// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IRunningInstance } from './IRunningInstance';
import { MicroserviceWithLocationAndPorts } from './MicroserviceWithLocationAndPorts';

export class RunningMicroservice {
    constructor(readonly microservice: MicroserviceWithLocationAndPorts, readonly runtime: IRunningInstance, readonly backend: IRunningInstance, readonly web: IRunningInstance) {
    }
}
