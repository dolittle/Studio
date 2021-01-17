// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { Workspaces } from '../Workspaces';
import { all_dependencies } from './given/all_dependencies';

const ROOT = '/the/root/folder';

describe('when constructing and root exists', () => {
    const dependencies = new all_dependencies();
    dependencies.filesAndFolders.root = ROOT;

    dependencies.fileSystem.exists.returns(true);

    new Workspaces(
        dependencies.workspaceConverter,
        dependencies.workspaceRenderer,
        dependencies.filesAndFolders,
        dependencies.fileSystem,
        dependencies.applicationLoader,
        dependencies.logger
    );

    it('should create the root directory', () => dependencies.fileSystem.mkdir.notCalled);
});
