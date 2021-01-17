// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { homedir } from 'os';
import * as path from 'path';
import { IWellKnownFilesAndFolders } from './IWellKnownFilesAndFolders';

export const DOLITTLE_ROOT = '.dolittle';
export const WORKSPACES_FILE = 'workspaces.json';

export class WellKnownFilesAndFolders implements IWellKnownFilesAndFolders {
    readonly root: string;
    readonly workspaces: string;
    readonly applicationFile: string = 'application.json';
    readonly microserviceFile: string = 'microservice.json';
    readonly workspaceFile: string = 'workspace.json';
    readonly dolittleFolder: string = '.dolittle';

    constructor() {
        this.root = path.join(homedir(), DOLITTLE_ROOT);
        this.workspaces = path.join(this.root, WORKSPACES_FILE);
    }
}
