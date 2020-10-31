// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { a_view_model_lifecycle_manager } from './given/a_view_model_lifecycle_manager';

import { expect } from 'chai';

class ViewModel {
}

describe('when signalling attached for view model without attached method', () => {
    const given = new a_view_model_lifecycle_manager();
    const viewModel = new ViewModel();

    let error: Error;

    try {
        given.manager.attached(viewModel);
    } catch (ex) {
        error = ex;
    }

    it('should not throw an exception', () => expect(error).to.be.undefined);
});