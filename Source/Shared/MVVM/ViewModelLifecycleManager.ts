// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor } from '@dolittle/types';
import { IViewModelLifecycleManager } from './IViewModelLifecycleManager';

import { IContainer } from '@shared/dependencyinversion/IContainer';

/**
 * Represents an implementation of {@link IViewModelLifecycleManager}.
 */
export class ViewModelLifecycleManager implements IViewModelLifecycleManager {

    /**
     * Initializes a new instance of {ViewModelLifecycleManager}.
     * @param {IContainer} _container Container to use for instantiation.
     */
    constructor(private readonly _container: IContainer) {
    }

    /** @inheritdoc */
    create<TViewModel>(viewModelType: Constructor<TViewModel>): TViewModel {
        const viewModel = this._container.get(viewModelType);
        return viewModel;
    }

    /** @inheritdoc */
    attached(viewModel: any): void {
        if (typeof viewModel.attached === 'function') {
            viewModel.attached();
        }
    }

    /** @inheritdoc */
    detached(viewModel: any): void {
        if (typeof viewModel.detached === 'function') {
            viewModel.detached();
        }
    }

    /** @inheritdoc */
    propsChanged(viewModel: any, props: any): void {
        if (typeof viewModel.propsChanged === 'function') {
            viewModel.propsChanged(props);
        }
    }
}
