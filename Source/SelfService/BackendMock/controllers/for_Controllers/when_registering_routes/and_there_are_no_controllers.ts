// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as sinon from 'ts-sinon';
import { describeThis } from '@shared/specs';
import { expect } from 'chai';
import given from '../given/given';
import { Router } from 'express';

describeThis(__filename, () => {
    const controllers = given.controllers();
    let error;
    try {
        controllers.registerRoutes(sinon.stubInterface<Router>());
    } catch (err) {
        error = err;
    }
    it('should not fail', () => expect(error).to.be.undefined);
});
