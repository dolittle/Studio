// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IWorkspacesToken, IWorkspaces } from '../../common/workspaces/IWorkspaces';
import { injectable, inject } from 'tsyringe';
import { Workspace } from '../../common/workspaces/Workspace';
import { Application, Microservice } from '@dolittle/vanir-common';
import { Globals } from '../Globals';
import { ApplicationState, IApplications, IApplicationsToken, RunState } from '../../common/applications';
import { ApplicationWithMicroservicesState } from '../ApplicationWithMicroservicesState';

@injectable()
export class ListViewModel {
    workspaces: Workspace[] = [];
    applicationsState: ApplicationState[] = [];
    microservicesStatePerApplication: ApplicationWithMicroservicesState[] = [];

    constructor(
        @inject(IWorkspacesToken) private readonly _workspaces: IWorkspaces,
        @inject(IApplicationsToken) private readonly _applications: IApplications,
        private readonly _globals: Globals) {
        this.populate();

        _globals.applicationsState.subscribe(_ => this.applicationsState = _);
        _globals.microserviceStatesPerApplication.subscribe(_ => this.microservicesStatePerApplication = _);
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

    async startApplication(workspace: Workspace) {
        this._applications.start(workspace.path, workspace.application!);
    }

    async stopApplication(workspace: Workspace) {
        this._applications.stop(workspace.path, workspace.application!);
    }


    setCurrentApplication(workspace: Workspace, application: Application) {
        this._globals.setWorkspace(workspace);
        this._globals.setApplication(application);
    }

    setCurrentMicroservice(microservice: Microservice) {
        this._globals.setMicroservice(microservice);
    }

    getRunStateForApplication(applicationId: string): RunState {
        const state = this.applicationsState.find(_ => _.id === applicationId);
        if (!state) return RunState.unknown;
        return state.state;
    }

    getRunStateForMicroservice(applicationId: string, microserviceId: string): RunState {
        const state = this.microservicesStatePerApplication.find(_ => _.applicationId === applicationId);
        if (!state) return RunState.unknown;
        const microserviceState = state.microservices.find(_ => _.id === microserviceId);
        if (!microserviceState) return RunState.unknown;
        return microserviceState.state;
    }
}
