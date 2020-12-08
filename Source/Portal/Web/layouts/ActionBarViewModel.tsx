// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { injectable } from 'tsyringe';
import { ActionBarState } from './ActionBarState';
import { ActionBar } from '@shared/portal';

@injectable()
export class ActionBarViewModel {
    actionBar?: ActionBar;

    constructor(private readonly _state: ActionBarState) {}
    activate() {
        this._state.current.subscribe((_) => (this.actionBar = _));
    }

    actionButtonClicked() {
        this._state.actionButtonTriggered();
    }
}
