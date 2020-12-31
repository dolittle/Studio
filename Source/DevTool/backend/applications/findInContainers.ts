// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ContainerInfo } from 'dockerode';
import { Application } from '@dolittle/vanir-common';

export function findInContainers(containers: ContainerInfo[], application: Application, name: string) {
    const fullName = `/dolittle_${application.name.toLowerCase()}-${name.toLowerCase()}`;
    const container = containers.find(_ => _.Names.some(n => n.startsWith(fullName)));
    if (!container) {
        throw new Error(`Couldn't find container '${name}' in application '${application.name}'`);
    }
    return container;
}
