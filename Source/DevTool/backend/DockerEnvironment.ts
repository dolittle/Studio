// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import Docker from 'dockerode';
import { container } from 'tsyringe';

export class DockerEnvironment {
    static initialize() {
        const docker = new Docker({socketPath: '/var/run/docker.sock'});
        container.registerInstance(Docker, docker);
}