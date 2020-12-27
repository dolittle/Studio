// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { IWorkspaces, IWorkspacesToken, Workspace } from '../../common/workspaces';
import { Interop } from '../Interop';

@injectable()
export class WorkspacesProxy implements IWorkspaces {
    constructor(private readonly _interop: Interop) {
    }

    addFromPath(path: string): Promise<void> {
        return this._interop.invoke(IWorkspacesToken, 'addFromPath', path);
    }

    async getAll(): Promise<Workspace[]> {
        return await this._interop.invoke(IWorkspacesToken, 'getAll') as Workspace[];
    }
}