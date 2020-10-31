// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { a_view_model_lifecycle_manager } from './given/a_view_model_lifecycle_manager';

import sinon from 'sinon';

class ViewModel {
}

describe('when signalling attached for view model with detached method', () => {
    const given = new a_view_model_lifecycle_manager();
    const viewModel = {
        detached: sinon.stub()
    };

    let error: Error;

    try {
        given.manager.detached(viewModel);
    } catch (ex) {
        error = ex;
    }

    it('should call the view models detached method', () => viewModel.detached.should.be.calledOnce);
});