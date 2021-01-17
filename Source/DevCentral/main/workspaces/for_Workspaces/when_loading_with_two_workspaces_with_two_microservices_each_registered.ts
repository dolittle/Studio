// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { two_workspaces_with_two_microservices_each_registered } from './given/two_workspaces_with_two_microservices_each_registered';

describe('when loading with two workspaces with two microservices each registered', async () => {

    const context = new two_workspaces_with_two_microservices_each_registered();

    await context.workspaces.load();
    const workspaces = await context.workspaces.getAll();

    it('should hold first microservice in first application', () => workspaces[0].microservices[0].should.equal(context.firstApplicationFirstMicroservice));
    it('should hold second microservice in first application', () => workspaces[0].microservices[1].should.equal(context.firstApplicationSecondMicroservice));
    it('should hold first microservice in second application', () => workspaces[1].microservices[0].should.equal(context.secondApplicationFirstMicroservice));
    it('should hold second microservice in second application', () => workspaces[1].microservices[1].should.equal(context.secondApplicationSecondMicroservice));
});
