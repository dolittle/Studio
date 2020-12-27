// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { container } from 'tsyringe';
import { IWorkspacesToken } from '../common/workspaces/IWorkspaces';
import { Workspaces } from './workspaces/Workspaces';

export class Services {
    static initialize() {
        container.registerSingleton(IWorkspacesToken, Workspaces);
    }
}