// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application } from '@dolittle/vanir-common';
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

    firstApplication = {
        id: '011aeb15-1572-4f93-8901-5c3b34d16cbc',
        microservices: []
    };

    secondApplication = {
        id: '90249ce2-4b67-42f2-a5ca-dc46d15e9cec',
        microservices: []
    };

    constructor() {
        super();

        this.filesAndFolders.workspaces = this.workspacesFile;
        this.fileSystem.exists.withArgs(this.workspacesFile).returns(true);
        this.fileSystem.readFile.withArgs(this.workspacesFile).returns(Promise.resolve(Buffer.from(this.workspacesFileContentAsJson)));

        this.applicationLoader.existsInFolder.withArgs(this.workspacesFileContent.workspaces[0]).returns(true);
        this.applicationLoader.loadFromFolder.withArgs(this.workspacesFileContent.workspaces[0]).returns(this.firstApplication);
        this.applicationLoader.existsInFolder.withArgs(this.workspacesFileContent.workspaces[1]).returns(true);
        this.applicationLoader.loadFromFolder.withArgs(this.workspacesFileContent.workspaces[1]).returns(this.secondApplication);
    }
}
