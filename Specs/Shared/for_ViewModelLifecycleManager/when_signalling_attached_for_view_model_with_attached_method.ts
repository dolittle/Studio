// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { a_view_model_lifecycle_manager } from './given/a_view_model_lifecycle_manager';

import sinon from 'sinon';

class ViewModel {
}

describe('when signalling attached for view model with attached method', () => {
    const given = new a_view_model_lifecycle_manager();
    const viewModel = {
        attached: sinon.stub()
    };

    let error: Error;

    try {
        given.manager.attached(viewModel);
    } catch (ex) {
        error = ex;
    }

    it('should call the view models attached method', () => viewModel.attached.should.be.calledOnce);
});