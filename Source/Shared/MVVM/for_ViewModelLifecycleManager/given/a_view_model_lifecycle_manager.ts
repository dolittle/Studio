// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import sinon from 'sinon';
import { IContainer } from '@shared/dependencyinversion';
import { ViewModelLifecycleManager } from '@shared/mvvm/ViewModelLifecycleManager';


export class a_view_model_lifecycle_manager {
    container: IContainer;

    getStub = sinon.stub();

    manager: ViewModelLifecycleManager;

    constructor() {
        this.container = {
            get: this.getStub
        };
        this.manager = new ViewModelLifecycleManager(this.container);
    }
}