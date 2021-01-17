// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Workspace, MicroservicePorts } from '../../../common/workspaces';
import { WorkspaceForRendering } from './WorkspaceForRendering';
import { IWorkspaceForRenderingConverter } from './IWorkspaceForRenderingConverter';
import { injectable } from 'tsyringe';

@injectable()
export class WorkspaceForRenderingConverter implements IWorkspaceForRenderingConverter {
    convert(workspace: Workspace): WorkspaceForRendering {
        return {
            path: workspace.path,
            application: {
                id: workspace.application.id,
                name: workspace.application.name
            },
            microservices: workspace.microservices.map(_ => {
                const ports = workspace.microservicePorts.find(p => p.id === _.id) || MicroservicePorts.default;
                return {
                    id: _.id,
                    name: _.name,
                    portal: workspace.application.portal.id === _.id,
                    applicationName: workspace.application.name,
                    ports: {
                        backend: ports.backend,
                        web: ports.web,
                        runtime: ports.runtime,
                        metrics: ports.metrics
                    }
                };
            })
        } as WorkspaceForRendering;
    }
}
