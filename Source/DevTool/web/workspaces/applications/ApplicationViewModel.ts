// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application } from '@dolittle/vanir-common';
import { injectable, inject } from 'tsyringe';
import { IApplications, IApplicationsToken } from '../../../common/applications/IApplications';
import { ApplicationStatus } from '../../../common/applications/ApplicationStatus';
import { Workspace } from '../../../common/workspaces/Workspace';

/* eslint-disable no-restricted-globals */
@injectable()
export class ApplicationViewModel {
    workspace?: Workspace;
    application?: Application;
    applicationStatus?: ApplicationStatus;

    constructor(
        @inject(IApplicationsToken) private readonly _applications: IApplications) {
    }

    setWorkspace(workspace: Workspace) {
        if (this.workspace?.id !== workspace.id) {
            this.workspace = workspace;
            this.application = workspace.application;
            this.updateStatus();
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
