// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IWorkspacesToken, IWorkspaces } from '../../common/workspaces/IWorkspaces';
import { injectable, inject } from 'tsyringe';
import { Workspace } from '../../common/workspaces/Workspace';
import { Microservice } from '@dolittle/vanir-common';
import { Microservices } from '../microservices/Microservices';

@injectable()
export class ListViewModel {
    workspaces: Workspace[] = [];

    constructor(
        @inject(IWorkspacesToken) private readonly _workspaces: IWorkspaces,
        private readonly _microservices: Microservices) {
        this.populate();
    }

    async populate() {
        this.workspaces = await this._workspaces.getAll();
    }

    async directoryAdded(path: string) {
        await this._workspaces.addFromPath(path);
        this.populate();
    }

    setCurrentMicroservice(microservice: Microservice) {
        this._microservices.setCurrent(microservice);
    }
}