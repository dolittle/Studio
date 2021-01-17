// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { WorkspacesFile } from '../../WorkspacesFile';
import { no_workspaces } from './no_workspaces';

export class two_workspaces_registered extends no_workspaces {
    workspacesFile: string = '/some/place/workspaces.json';

    workspacesFileContent: WorkspacesFile = {
        workspaces: [
            '/first/workspace',
            '/second/workspace'
        ]
    };

    workspacesFileContentAsJson = JSON.stringify(this.workspacesFileContent);

    constructor() {
        super();

        this.filesAndFolders.workspaces = this.workspacesFile;
        this.fileSystem.exists.withArgs(this.workspacesFile).returns(true);
        this.fileSystem.readFile.withArgs(this.workspacesFile).returns(Promise.resolve(Buffer.from(this.workspacesFileContentAsJson)));

        this.fileSystem.exists
            .withArgs(`${this.workspacesFileContent.workspaces[0]}/${this.filesAndFolders.applicationFile}`)
            .returns(true);

        this.fileSystem.readFile
            .withArgs(`${this.workspacesFileContent.workspaces[0]}/${this.filesAndFolders.applicationFile}`)
            .returns(Promise.resolve(Buffer.from(JSON.stringify({}))));

        this.fileSystem.exists
            .withArgs(`${this.workspacesFileContent.workspaces[1]}/${this.filesAndFolders.applicationFile}`)
            .returns(true);

        this.fileSystem.readFile
            .withArgs(`${this.workspacesFileContent.workspaces[1]}/${this.filesAndFolders.applicationFile}`)
            .returns(Promise.resolve(Buffer.from(JSON.stringify({}))));
    }
}
