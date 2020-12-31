// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { container } from 'tsyringe';
import { IWorkspacesToken } from '../common/workspaces/IWorkspaces';
import { Interop } from './Interop';
import { WorkspacesProxy } from './workspaces/WorkspacesProxy';
import { IApplicationsToken } from '../common/applications/IApplications';
import { ApplicationsProxy } from './applications/ApplicationsProxy';

export class Services {
    static initialize() {
        container.registerSingleton(Interop, Interop);
        container.registerSingleton(IWorkspacesToken, WorkspacesProxy);
        container.registerSingleton(IApplicationsToken, ApplicationsProxy);
    }
}