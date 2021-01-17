// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Workspace } from '../../../common/workspaces/Workspace';
import { WorkspaceForRendering } from './WorkspaceForRendering';

export abstract class IWorkspaceForRenderingConverter {
    abstract convert(workspace: Workspace): WorkspaceForRendering;
}
