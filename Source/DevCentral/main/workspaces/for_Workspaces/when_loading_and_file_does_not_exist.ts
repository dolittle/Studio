// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { no_workspaces } from './given/no_workspaces';
import { Workspace } from '../../../common/workspaces';

describe('when loading and file does not exist', async () => {
    const context = new no_workspaces();
    let result: Workspace[] = [];

    context.workspaces.load();
    result = await context.workspaces.getAll();

    it('should not have any workspaces', () => result.should.be.empty);
});
