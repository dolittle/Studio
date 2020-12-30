// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { IWorkspaces, IWorkspacesToken, Workspace } from '../../common/workspaces';
import { Interop } from '../Interop';

@injectable()
export class WorkspacesProxy implements IWorkspaces {
    constructor(private readonly _interop: Interop) {
    }

    create(path: string, name: string, tenant: string, license: string, containerRegistry: string, portal: boolean): Promise<void> {
        return this._interop.invoke(IWorkspacesToken, 'create', path, name, tenant, license, containerRegistry, portal);
    }
    createMicroservice(path: string, name: string, addWebFrontend: boolean): Promise<void> {
        return this._interop.invoke(IWorkspacesToken, 'createMicroservice', path, name, addWebFrontend);
    }

    addFromPath(path: string): Promise<void> {
        return this._interop.invoke(IWorkspacesToken, 'addFromPath', path);
    }

    async getAll(): Promise<Workspace[]> {
        return await this._interop.invoke(IWorkspacesToken, 'getAll') as Workspace[];
    }

    remove(path: string): Promise<void> {
        return this._interop.invoke(IWorkspacesToken, 'remove', path);
    }
}