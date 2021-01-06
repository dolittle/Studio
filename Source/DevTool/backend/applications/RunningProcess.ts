// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ChildProcess } from 'child_process';
import { InstanceType, RunningInstanceType } from '../../common/applications';
import { AccumulatedStream } from '../AccumulatedStream';
import { IRunningInstance } from './IRunningInstance';
import { MicroserviceWithLocationAndPorts } from './MicroserviceWithLocationAndPorts';
export class RunningProcess implements IRunningInstance {
    private _accumulatedStream: AccumulatedStream;

    readonly id: string;
    readonly type: InstanceType = InstanceType.process;

    constructor(readonly name: string, readonly instance: RunningInstanceType, readonly microservice: MicroserviceWithLocationAndPorts, private _process: ChildProcess) {
        this.id = _process.pid.toString();

        this._accumulatedStream = new AccumulatedStream();
        _process.stdout?.pipe(this._accumulatedStream);
        _process.stderr?.pipe(this._accumulatedStream);
    }

    async getLogs(): Promise<NodeJS.ReadableStream> {
        return this._accumulatedStream.createStream();
    }

    async pause(): Promise<void> {

    }

    async stop(): Promise<void> {
        this._process.kill('SIGTERM');
    }
}
