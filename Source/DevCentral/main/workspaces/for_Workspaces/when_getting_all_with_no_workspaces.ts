// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { no_workspaces } from './given/no_workspaces';

describe('when getting all with no workspaces', async () => {
    const context = new no_workspaces();

    const all = await context.workspaces.getAll();

    it('should not have any workspaces', () => all.should.be.empty);
});
