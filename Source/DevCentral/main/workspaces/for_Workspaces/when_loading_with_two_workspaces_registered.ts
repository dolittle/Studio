// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { two_workspaces_registered } from './given/two_workspaces_registered';

describe('when loading with two workspaces registered', async () => {

    const context = new two_workspaces_registered();

    await context.workspaces.load();
    const workspaces = await context.workspaces.getAll();

    it('should have two workspaces', () => workspaces.length.should.equal(2));
});
