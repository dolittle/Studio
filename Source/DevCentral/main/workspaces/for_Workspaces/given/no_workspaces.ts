// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { all_dependencies } from './all_dependencies';
import { Workspaces } from '../../Workspaces';

export class no_workspaces extends all_dependencies {
    workspaces: Workspaces;

    constructor() {
        super();

        this.workspaces = new Workspaces(
            this.workspaceConverter,
            this.workspaceRenderer,
            this.filesAndFolders,
            this.fileSystem,
            this.applicationLoader,
            this.microserviceLoader,
            this.microservicePortsAllocator,
            this.logger
        );
    }
}


