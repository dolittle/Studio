// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IWorkspacesToken, IWorkspaces } from '../../common/workspaces/IWorkspaces';
import { injectable, inject } from 'tsyringe';

@injectable()
export class ListViewModel {
    workspaces: string[] = [];

    constructor(@inject(IWorkspacesToken) private readonly _workspaces: IWorkspaces) {
    }

    async directoryAdded(directory: string) {
        this.workspaces = [...this.workspaces, directory];

        await this._workspaces.getAll();
    }
}