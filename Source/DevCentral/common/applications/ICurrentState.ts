// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { RunState } from './RunState';
import { InstanceType } from './InstanceType';

export const ICurrentStateToken = 'ICurrentState';

export interface ICurrentState {
    reportTask(applicationId: string, task: string): Promise<void>;
    reportRunStateForApplication(applicationId: string, runState: RunState): Promise<void>;
    reportRunStateForInstance(applicationId: string, instanceId: string, runState: RunState): Promise<void>;
    reportRunStateForMicroservice(applicationId: string, microserviceId: string, runState: RunState): Promise<void>;
    registerInstance(applicationId: string, instanceId: string, name: string, type: InstanceType): Promise<void>;
    removeInstanceFrom(applicationId: string, instanceId: string): Promise<void>;
    removeAllInstancesFrom(applicationId: string): Promise<void>;
}
