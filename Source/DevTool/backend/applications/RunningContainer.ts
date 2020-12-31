// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import Docker, { ContainerInfo } from 'dockerode';
import { IRunningInstance } from './IRunningInstance';

export class RunningContainer implements IRunningInstance {
    logs?: NodeJS.ReadableStream;

    constructor(docker: Docker, container: ContainerInfo) {
        docker.getContainer(container.Names[0]).logs().then(_ => {
            this.logs = _;
        });
    }
}
