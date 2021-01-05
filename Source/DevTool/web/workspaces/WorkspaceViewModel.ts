// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable, inject } from 'tsyringe';
import { IWorkspacesToken, IWorkspaces } from '../../common/workspaces/IWorkspaces';
import { Workspace } from '../../common/workspaces';
import { Guid } from '@dolittle/rudiments';

const NotSet = new Workspace(Guid.empty.toString(), '', {
    id: Guid.empty.toString(),
    name: 'NotSet',
    tenant: '',
    license: '',
    containerRegistry: '',
    portal: {
        enabled: true,
        id: ''
    },
    microservices: []
});

type WorkspaceRouteParams = {
    workspaceId: string;
};

@injectable()
export class WorkspaceViewModel {
    private _workspaceId: string = '';
    workspace: Workspace = NotSet;

    constructor(@inject(IWorkspacesToken) private readonly _workspaces: IWorkspaces) {
    }

    paramsChanged(params: WorkspaceRouteParams) {
        if (this._workspaceId !== params.workspaceId) {
            this._workspaceId = params.workspaceId;
            this.getWorkspace(params.workspaceId);
        }
    }

    getWorkspace(id: string) {
        this._workspaces.getById(id).then(workspace => this.workspace = workspace);
    }
}
