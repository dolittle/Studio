// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application, Microservice } from '@dolittle/vanir-common';

export class Workspace {
    readonly microservices: Microservice[] = [];

    constructor(readonly path: string, readonly application: Application) {
    }
}
