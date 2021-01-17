// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { container } from 'tsyringe';
import { constructor } from '@dolittle/vanir-dependency-inversion';
import { IWorkspaceRenderer } from './rendering/IWorkspaceRenderer';
import { WorkspaceRenderer } from './rendering/WorkspaceRenderer';
import { IWorkspaceForRenderingConverter } from './rendering/IWorkspaceForRenderingConverter';
import { WorkspaceForRenderingConverter } from './rendering/WorkspaceForRenderingConverter';
import { IWorkspaceConverter } from './IWorkspaceConverter';
import { WorkspaceConverter } from './WorkspaceConverter';
import { IApplicationLoader } from './IApplicationLoader';
import { ApplicationLoader } from "./ApplicationLoader";
import { IMicroserviceLoader } from './IMicroserviceLoader';
import { MicroserviceLoader } from './MicroserviceLoader';

export class Bindings {
    static initialize() {
        container.registerSingleton(IWorkspaceForRenderingConverter as constructor<IWorkspaceForRenderingConverter>, WorkspaceForRenderingConverter);
        container.registerSingleton(IWorkspaceConverter as constructor<IWorkspaceConverter>, WorkspaceConverter);
        container.registerSingleton(IWorkspaceRenderer as constructor<IWorkspaceRenderer>, WorkspaceRenderer);
        container.registerSingleton(IApplicationLoader as constructor<IApplicationLoader>, ApplicationLoader);
        container.registerSingleton(IMicroserviceLoader as constructor<IMicroserviceLoader>, MicroserviceLoader);
    }
}
