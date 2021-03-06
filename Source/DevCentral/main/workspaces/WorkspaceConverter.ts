// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Workspace } from '../../common/workspaces';
import { WorkspaceFile } from './WorkspaceFile';
import { IWorkspaceConverter } from './IWorkspaceConverter';
import { IApplicationLoader } from './IApplicationLoader';
import { injectable } from 'tsyringe';
import { TenantFile } from './TenantFile';

@injectable()
export class WorkspaceConverter implements IWorkspaceConverter {
    constructor(private readonly _applicationLoader: IApplicationLoader) {
    }

    toFile(workspace: Workspace): WorkspaceFile {
        return {
            id: workspace.id,
            ports: workspace.microservicePorts,
            tenants: workspace.tenants.map(_ => {
                return { id: _.id.toString(), name: _.name } as TenantFile;
            })
        } as WorkspaceFile;
    }
}
