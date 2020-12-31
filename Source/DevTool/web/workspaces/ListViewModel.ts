// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IWorkspacesToken, IWorkspaces } from '../../common/workspaces/IWorkspaces';
import { injectable, inject } from 'tsyringe';
import { Workspace } from '../../common/workspaces/Workspace';
import { Application, Microservice } from '@dolittle/vanir-common';
import { Microservices } from '../Microservices';
import { Applications } from '../Applications';
import { Workspaces } from '../Workspaces';

@injectable()
export class ListViewModel {
    workspaces: Workspace[] = [];

    constructor(
        @inject(IWorkspacesToken) private readonly _workspaces: IWorkspaces,
        private readonly _workspacesState: Workspaces,
        private readonly _applications: Applications,
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

    async createApplication(path: string, name: string, tenant: string, license: string, containerRegistry: string, portal: boolean) {
        await this._workspaces.create(path, name, tenant, license, containerRegistry, portal);
        await this.directoryAdded(path);
    }

    async createMicroservice(path: string, name: string, addWebFrontend: boolean) {
        await this._workspaces.createMicroservice(path, name, addWebFrontend);
        this.populate();
    }

    async remove(path: string) {
        await this._workspaces.remove(path);
        this.populate();
    }

    setCurrentApplication(workspace: Workspace, application: Application) {
        this._workspacesState.setCurrent(workspace);
        this._applications.setCurrent(application);
    }

    setCurrentMicroservice(microservice: Microservice) {
        this._microservices.setCurrent(microservice);
    }
}