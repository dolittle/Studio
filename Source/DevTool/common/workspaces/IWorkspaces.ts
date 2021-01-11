// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application } from '@dolittle/vanir-common';
import { Workspace } from './Workspace';
export const IWorkspacesToken = 'IWorkspaces';

export interface IWorkspaces {
    addFromPath(path: string): Promise<void>;
    getAll(): Promise<Workspace[]>;
    getById(id: string): Promise<Workspace>;
    getFor(application: Application): Promise<Workspace>

    create(path: string, name: string, tenant: string, license: string, containerRegistry: string, portal: boolean): Promise<void>;
    createMicroservice(path: string, name: string, addWebFrontend: boolean): Promise<void>;
    remove(path: string);
    load(): Promise<void>;
}
