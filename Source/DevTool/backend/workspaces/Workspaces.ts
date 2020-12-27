// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IWorkspaces, Workspace } from '../../common/workspaces';

export class Workspaces implements IWorkspaces {
    async getAll(): Promise<Workspace[]> {
        return [new Workspace('My Workspace', '/some/where')];
    }
}