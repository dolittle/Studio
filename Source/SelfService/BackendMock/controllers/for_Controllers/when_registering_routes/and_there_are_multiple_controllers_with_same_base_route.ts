// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as sinon from 'ts-sinon';
import { describeThis } from '@shared/specs';
import { expect } from 'chai';
import given from '../given/given';
import { Router } from 'express';
import { MultipleControllersForBaseRoute } from '../../MultipleControllersForBaseRoute';

describeThis(__filename, () => {
    const baseRoute = '/some/route'
    const controller_1 = given.a_controller(baseRoute);
    const controller_2 = given.a_controller(baseRoute);
    const controllers = given.controllers(controller_1, controller_2);
    let error;
    try {
        controllers.registerRoutes(sinon.stubInterface<Router>());
    } catch (err) {
        error = err;
    }
    it('should fail because there are multiple controllers with base route', () => expect(error).to.be.instanceOf(MultipleControllersForBaseRoute));
});
