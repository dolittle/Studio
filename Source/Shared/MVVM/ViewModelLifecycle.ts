// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IViewContext } from './IViewContext';

export class ViewModelLifecycle {
    private _activateInvoked: boolean = false;

    constructor(private readonly _viewModel: any) {
    }

    activate(viewContext: IViewContext<any>) {
        if (this._activateInvoked) return;
        if (typeof this._viewModel.activate === 'function') {
            this._viewModel.activate(viewContext);
        }
        this._activateInvoked = true;
    }
}
