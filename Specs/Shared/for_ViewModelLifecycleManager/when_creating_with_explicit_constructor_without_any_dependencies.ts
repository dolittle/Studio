// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { a_view_model_lifecycle_manager } from './given/a_view_model_lifecycle_manager';

class ViewModel {
    constructor() {
    }
}

describe('when creating with explicit constructor without any dependencies', () => {
    const given = new a_view_model_lifecycle_manager();

    const expected = new ViewModel();
    given.getStub.returns(expected);

    const instance = given.manager.create(ViewModel);

    it('should return expected instance', () => instance.should.equal(expected));
});