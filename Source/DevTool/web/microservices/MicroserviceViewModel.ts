// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Microservices } from '../Microservices';
import { injectable } from 'tsyringe';
import { Microservice, Application } from '@dolittle/vanir-common';
import { Applications } from '../Applications';
import { Workspace } from '../../common/workspaces/Workspace';
import { Workspaces } from '../Workspaces';

@injectable()
export class MicroserviceViewModel {
    workspace!: Workspace;
    application!: Application;
    microservice!: Microservice;

    constructor(workspaces: Workspaces, applications: Applications, microservices: Microservices) {
        workspaces.current.subscribe(_ => this.workspace = _);
        applications.current.subscribe(_ => this.application = _);
        microservices.current.subscribe(_ => this.microservice = _);
    }
}
