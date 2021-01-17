// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { container } from 'tsyringe';
import { IWorkspacesToken } from '../common/workspaces/IWorkspaces';
import { Interop } from './Interop';
import { WorkspacesProxy } from './workspaces/WorkspacesProxy';
import { IApplicationsToken, ICurrentStateToken } from '../common/applications';
import { ApplicationsProxy } from './workspaces/applications/ApplicationsProxy';
import { IApplicationLogToken } from '../common';
import { ApplicationLogProxy } from './ApplicationLogProxy';
import { CurrentState } from './CurrentState';

export class Services {
    static initialize() {
        Interop.initialize();
        container.registerSingleton(Interop, Interop);
        container.registerSingleton(IWorkspacesToken, WorkspacesProxy);
        container.registerSingleton(IApplicationsToken, ApplicationsProxy);
        container.registerSingleton(IApplicationLogToken, ApplicationLogProxy);
        container.registerSingleton(ICurrentStateToken, CurrentState);
    }
}
