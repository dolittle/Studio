// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ICurrentState, ICurrentStateToken, RunState, InstanceType } from '../common/applications';
import { injectable } from 'tsyringe';
import { Interop } from './Interop';

@injectable()
export class CurrentStateProxy implements ICurrentState {

    constructor(private readonly _interop: Interop) {}

    reportTask(applicationId: string, task: string): Promise<void> {
        return this._interop.invoke(ICurrentStateToken, 'reportTask', applicationId, task);
    }

    reportRunStateForApplication(applicationId: string, runState: RunState): Promise<void> {
        return this._interop.invoke(ICurrentStateToken, 'reportRunStateForApplication', applicationId, runState);
    }
    reportRunStateForInstance(applicationId: string, instanceId: string, runState: RunState): Promise<void> {
        return this._interop.invoke(ICurrentStateToken, 'reportRunStateForInstance', applicationId, instanceId, runState);
    }

    reportRunStateForMicroservice(applicationId: string, microserviceId: string, runState: RunState): Promise<void> {
        return this._interop.invoke(ICurrentStateToken, 'reportRunStateForMicroservice', applicationId, microserviceId, runState);
    }

    registerInstance(applicationId: string, instanceId: string, name: string, type: InstanceType): Promise<void> {
        return this._interop.invoke(ICurrentStateToken, 'registerInstance', applicationId, instanceId, name, type);
    }

    removeInstanceFrom(applicationId: string, instanceId: string): Promise<void> {
        return this._interop.invoke(ICurrentStateToken, 'removeInstanceFrom', applicationId, instanceId);
    }

    removeAllInstancesFrom(applicationId: string): Promise<void> {
        return this._interop.invoke(ICurrentStateToken, 'removeAllInstancesFrom', applicationId);
    }
}
