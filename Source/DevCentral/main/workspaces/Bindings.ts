// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { container } from 'tsyringe';
import { constructor } from '@dolittle/vanir-dependency-inversion';
import { IWorkspaceRenderer } from './rendering/IWorkspaceRenderer';
import { WorkspaceRenderer } from './rendering/WorkspaceRenderer';
import { IWorkspaceConverter } from './rendering/IWorkspaceConverter';
import { WorkspaceConverter } from './rendering/WorkspaceConverter';


export class Bindings {
    static initialize() {
        container.registerSingleton(IWorkspaceConverter as constructor<IWorkspaceConverter>, WorkspaceConverter);
        container.registerSingleton(IWorkspaceRenderer as constructor<IWorkspaceRenderer>, WorkspaceRenderer);
    }
}
