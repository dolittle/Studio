// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { map } from 'rxjs/operators';
import { Application } from '@dolittle/vanir-common';
import { injectable, inject } from 'tsyringe';
import { IApplications, IApplicationsToken } from '../../../common/applications/IApplications';
import { ApplicationStatus } from '../../../common/applications/ApplicationStatus';
import { Workspace } from '../../../common/workspaces/Workspace';
import { FeatureNavigationDefinition, ToolbarItem, ToolbarItems } from '../../components';
import { Globals } from '../../Globals';
import { ApplicationState, RunState } from '../../../common/applications';
import { BehaviorSubject } from 'rxjs';

/* eslint-disable no-restricted-globals */
@injectable()
export class ApplicationViewModel {
    baseUrl: string = '';
    workspace?: Workspace;
    application?: Application;
    applicationStatus?: ApplicationStatus;

    applicationState: ApplicationState = { id: '', state: RunState.unknown };

    constructor(
        @inject(IApplicationsToken) private readonly _applications: IApplications,
        private readonly _navigation: FeatureNavigationDefinition,
        private readonly _toolbarItems: ToolbarItems,
        private readonly _globals: Globals) {
    }

    activate() {
        this.setToolbar();
    }

    setWorkspace(workspace: Workspace) {
        if (this.workspace?.id !== workspace.id) {
            this.workspace = workspace;
            this.application = workspace.application;
            this._globals.setTitle(`${this.application.name}`);
            this.updateStatus();

            this._globals.applicationStateFor(this.application).subscribe(_ => {
                this.applicationState = _;
                this.setToolbar();
            });
        }
    }

    setBaseURL(url: string) {
        if (url !== this.baseUrl) {
            this.baseUrl = url;

            this._navigation.setLinks([
                { name: 'Overview', link: `${this.baseUrl}/overview` },
                { name: 'Mongo', link: `${this.baseUrl}/mongo` },
                { name: 'Ingress', link: `${this.baseUrl}/ingress` }
            ]);
        }
    }

    async start() {
        this._applications.start(this.workspace!.path, this.application!);
    }

    async stop() {
        this._applications.stop(this.workspace!.path, this.application!);
    }

    async updateStatus() {
        if (this.application) {
            this.applicationStatus = await this._applications.getStatusFor(this.application!.id);
        }
    }

    setToolbar() {
        const items: ToolbarItem[] = [];
        const startItem: ToolbarItem = { name: 'Start', icon: 'MSNVideosSolid', onClick: () => this.start() };
        const stopItem: ToolbarItem = { name: 'Stop', icon: 'CircleStopSolid', onClick: () => this.stop() };

        switch (this.applicationState.state) {
            case RunState.unknown:
            case RunState.stopped:
            case RunState.stopping: {
                items.push(startItem);
            } break;

            case RunState.partial: {
                items.push(startItem);
                items.push(stopItem);
            } break;

            case RunState.starting:
            case RunState.running: {
                items.push(stopItem);
            } break;
        }

        this._toolbarItems.setItems(items);
    }
}
