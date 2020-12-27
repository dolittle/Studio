// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Workspace } from './Workspace';
export const IWorkspacesToken = 'IWorkspaces';

export interface IWorkspaces {
    getAll(): Promise<Workspace[]>;
}