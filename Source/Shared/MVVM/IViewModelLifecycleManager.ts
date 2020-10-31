// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor } from '@dolittle/types';

/**
 * Defines the manager that is responsible for the lifecycle of a ViewModel
 */
export interface IViewModelLifecycleManager {

    /**
     * Create an instance of a ViewModel
     * @param {Constructor<TViewModel> viewModelType Constructor for the ViewModel to create.
     */
    create<TViewModel>(viewModelType: Constructor<TViewModel>): TViewModel;

    /**
     * Handle when the ViewModel gets attached to a view.
     * @param {*} viewModel ViewModel that gets attached.
     */
    attached(viewModel: any): void;

    /**
     * Handle when the ViewModel gets detached from a view.
     * @param {*} viewModel ViewModel that gets detached.
     */
    detached(viewModel: any): void;

    /**
     * Handle when props that are typically handed to the view gets changed.
     * @param {*} viewModel ViewModel that should be notified for props changed.
     */
    propsChanged(viewModel: any, props: any): void;
}


