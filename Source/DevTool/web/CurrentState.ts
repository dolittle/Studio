// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ICurrentState, InstanceType, RunState } from '../common/applications';
import { Globals } from './Globals';
import { injectable } from 'tsyringe';

@injectable()
export class CurrentState implements ICurrentState {
    constructor(private readonly _globals: Globals) {}

    async reportTask(applicationId: string, task: string): Promise<void> {
        console.log(`Task for ${applicationId} - ${task}`);
    }

    async reportRunStateForApplication(applicationId: string, runState: RunState): Promise<void> {
        this._globals.setApplicationState({id: applicationId, state: runState});
    }

    async reportRunStateForInstance(applicationId: string, instanceId: string, runState: RunState): Promise<void> {
    }

    async reportRunStateForMicroservice(applicationId: string, microserviceId: string, runState: RunState): Promise<void> {
    }

    async registerInstance(applicationId: string, instanceId: string, name: string, type: InstanceType): Promise<void> {
    }

    async removeInstanceFrom(applicationId: string, instanceId: string): Promise<void> {
    }

    async removeAllInstancesFrom(applicationId: string): Promise<void> {
    }
}
