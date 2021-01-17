// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export abstract class IWellKnownFilesAndFolders {
    abstract root: string;
    abstract workspaces: string;

    abstract applicationFile: string;
    abstract microserviceFile: string;
    abstract workspaceFile: string;
    abstract dolittleFolder: string;
}

