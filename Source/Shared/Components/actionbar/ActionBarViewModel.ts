// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ActionBarProps } from './ActionBarProps';
import { IViewContext } from '@shared/mvvm';
import { ActionBarAction, ActionBarBroker } from '@shared/portal';
import { injectable } from 'tsyringe';

@injectable()
export class ActionBarViewModel {

    constructor(private readonly _actionBarItems: ActionBarBroker) {

    }

    activate(viewContext: IViewContext<ActionBarViewModel, ActionBarProps>) {
        this._actionBarItems.set({
            button: new ActionBarAction(
                viewContext.props.title,
                viewContext.props.icon,
                viewContext.props.onTriggered),
            placement: 'bottom'
        })
    }
}