// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { a_view_model_lifecycle_manager } from './given/a_view_model_lifecycle_manager';

import sinon from 'sinon';

class ViewModel {
}

describe('when signalling props changed for view model with props changed method', () => {
    const given = new a_view_model_lifecycle_manager();
    const viewModel = {
        propsChanged: sinon.stub()
    };

    const props = {
        something: 42
    };

    let error: Error;

    try {
        given.manager.propsChanged(viewModel, props);
    } catch (ex) {
        error = ex;
    }

    it('should call the view models props changed', () => viewModel.propsChanged.should.be.calledOnceWith(props));
});