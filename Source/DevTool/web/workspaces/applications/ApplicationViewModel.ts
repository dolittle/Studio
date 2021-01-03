// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application } from '@dolittle/vanir-common';
import { injectable, inject } from 'tsyringe';
import { IApplications, IApplicationsToken } from '../../../common/applications/IApplications';
import { ApplicationStatus } from '../../../common/applications/ApplicationStatus';
import { Workspace } from '../../../common/workspaces/Workspace';
import { FeatureNavigationDefinition, ToolbarItems } from '../../components';
import { Globals } from '../../Globals';

/* eslint-disable no-restricted-globals */
@injectable()
export class ApplicationViewModel {
    baseUrl: string = '';
    workspace?: Workspace;
    application?: Application;
    applicationStatus?: ApplicationStatus;

    constructor(
        @inject(IApplicationsToken) private readonly _applications: IApplications,
        private readonly _navigation: FeatureNavigationDefinition,
        private readonly _toolbarItems: ToolbarItems,
        private readonly _globals: Globals) {
    }

    activate() {
        this._toolbarItems.setItems([
            { name: 'Start', icon: 'MSNVideosSolid', onClick: () => this.start() },
            { name: 'Stop', icon: 'MSNVideosSolid', onClick: () => this.stop() }
        ]);
    }

    setWorkspace(workspace: Workspace) {
        if (this.workspace?.id !== workspace.id) {
            this.workspace = workspace;
            this.application = workspace.application;
            this._globals.setTitle(`${this.application.name}`);
            this.updateStatus();
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
}
