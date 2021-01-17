// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Workspace } from '../../common/workspaces';
import { WorkspaceFile } from './WorkspaceFile';

export abstract class IWorkspaceConverter {
    abstract toFile(workspace: Workspace): WorkspaceFile;
}
