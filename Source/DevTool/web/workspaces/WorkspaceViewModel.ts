// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable, inject } from 'tsyringe';
import { IWorkspacesToken } from '../../common/workspaces/IWorkspaces';
import { IWorkspaces } from '../../build/common/workspaces/IWorkspaces';
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


@injectable()
export class WorkspaceViewModel {
    workspaceId: string = '';
    workspace: Workspace = NotSet;

    constructor(@inject(IWorkspacesToken) private readonly _workspaces: IWorkspaces) {
    }

    setWorkspaceId(id: string) {
        if (this.workspaceId !== id) {
            this.workspaceId = id;
            this.getWorkspace(id);
        }
    }

    getWorkspace(id: string) {
        this._workspaces.getById(id).then(workspace => this.workspace = workspace);
    }
}
