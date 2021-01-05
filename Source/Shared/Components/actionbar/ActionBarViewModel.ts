// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ActionBarProps } from './ActionBarProps';
import { ActionBarAction, ActionBarBroker } from '@shared/portal';
import { injectable } from 'tsyringe';

@injectable()
export class ActionBarViewModel {

    constructor(private readonly _actionBarItems: ActionBarBroker) {

    }

    propsChanged(props: ActionBarProps) {
        this._actionBarItems.set({
            button: new ActionBarAction(
                props.title,
                props.icon,
                props.onTriggered),
            placement: 'bottom'
        })
    }
}
