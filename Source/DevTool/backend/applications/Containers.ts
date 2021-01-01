// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ContainerInfo } from 'dockerode';
import { Application } from '@dolittle/vanir-common';

export class Containers {
    constructor(private _application: Application, private _containers: ContainerInfo[]) {
    }

    getByName(name: string) {
        const fullName = `/dolittle_${this._application.name.toLowerCase()}-${name.toLowerCase()}`;
        const container = this._containers.find(_ => _.Names.some(n => n.startsWith(fullName)));
        if (!container) {
            throw new Error(`Couldn't find container '${name}' in application '${this._application.name}'`);
        }
        return container;
    }
}
