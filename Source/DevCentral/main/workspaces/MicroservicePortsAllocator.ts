// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Microservice } from '@dolittle/vanir-common';
import { Workspace } from '../../common/workspaces';
import { MicroservicePorts } from '../../common/workspaces/MicroservicePorts';
import { IMicroservicePortsAllocator } from './IMicroservicePortsAllocator';
import { injectable } from 'tsyringe';

@injectable()
export class MicroservicePortsAllocator implements IMicroservicePortsAllocator {
    allocateFor(workspace: Workspace): MicroservicePorts[] {
        const microservices: Microservice[] = [];

        const portal = workspace.microservices.find(_ => _.id === workspace.application.portal.id);
        if (portal) {
            microservices.push(portal);
        }
        microservices.push(...workspace.microservices.filter(_ => _.id !== workspace.application.portal.id));
        return microservices.map((_, index) => new MicroservicePorts(
            _.id,
            3001 + index,
            9001 + index,
            50052 + (index * 2),
            9701 + index));
    }
}
