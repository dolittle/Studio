// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import Docker, { ContainerInfo } from 'dockerode';
import { InstanceType } from '../../common/applications/index';
import { IRunningInstance } from './IRunningInstance';

export class RunningContainer implements IRunningInstance {
    readonly id: string;
    readonly name: string;
    readonly type: InstanceType = InstanceType.container;

    constructor(private readonly _docker: Docker, private readonly _container: ContainerInfo) {
        this.id = _container.Id;
        this.name = _container.Image;
    }

    async getLogs(): Promise<NodeJS.ReadableStream> {
        const logs = await this._docker.getContainer(this._container.Id).logs({
            stdout: true,
            stderr: true,
            follow: true
        });
        logs.setEncoding('utf8');
        return logs;
    }

    async pause(): Promise<void> {

    }

    async stop(): Promise<void> {

    }
}
