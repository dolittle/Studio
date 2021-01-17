// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ICurrentState, InstanceType, RunState } from '../common/applications';
import { Globals } from './Globals';
import { injectable } from 'tsyringe';

@injectable()
export class CurrentState implements ICurrentState {
    constructor(private readonly _globals: Globals) { }

    async reportTask(applicationId: string, task: string): Promise<void> {
        console.log(`Task for ${applicationId} - ${task}`);
    }

    async reportRunStateForApplication(applicationId: string, runState: RunState): Promise<void> {
        this._globals.setApplicationState({ id: applicationId, state: runState });
    }

    async reportRunStateForInstance(applicationId: string, instanceId: string, runState: RunState): Promise<void> {
        const applicationInstances = this._globals.applicationInstances.value.find(_ => _.applicationId === applicationId);
        if (applicationInstances) {
            const instance = applicationInstances.instances.find(_ => _.id === instanceId);
            if (instance) {
                instance.state = runState;
                this._globals.reportInstanceStateFor(applicationId, instance);
            }
        }
    }

    async reportRunStateForMicroservice(applicationId: string, microserviceId: string, runState: RunState): Promise<void> {
        this._globals.setMicroserviceState(applicationId, { id: microserviceId, state: runState });
    }

    async registerInstance(applicationId: string, instanceId: string, name: string, type: InstanceType): Promise<void> {
        this._globals.reportInstanceStateFor(applicationId, {
            id: instanceId, name, type, state: RunState.stopped, started: new Date()
        });
    }

    async removeInstanceFrom(applicationId: string, instanceId: string): Promise<void> {
        this._globals.removeInstanceFor(applicationId, instanceId);
    }

    async removeAllInstancesFrom(applicationId: string): Promise<void> {
        this._globals.removeAllInstancesFrom(applicationId);
    }
}
