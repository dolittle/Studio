// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable, singleton } from 'tsyringe';
import { IMessenger } from '@dolittle/vanir-web';
import { ActionBarAction } from './ActionBarAction';
import { ActionBar } from './ActionBar';
import { ActionBarActionForMessage } from './ActionBarActionForMessage';
import { ActionBarActionWasTriggered } from './ActionBarActionWasTriggered';
import { ActionBarStructureChanged } from './ActionBarStructureChanged';

/**
 * Represents the system for working with the action bar structure of a microservice.
 */
@singleton()
@injectable()
export class ActionBarBroker {
    private _actionButton?: ActionBarAction;

    /**
     * Initializes a new instance of {@link ActionBarBroker}.
     * @param {IMessenger} _messenger Messenger to use for publishing messages.
     */
    constructor(private readonly _messenger: IMessenger) {
        _messenger.subscribeTo(ActionBarActionWasTriggered, (_) => {
            this._actionButton?.onTriggered?.();
        });
    }

    /**
     * Sets the ActionBar structure for portal with an Action Button.
     * Ensures the associated handler is triggered for the Action Button
     * @param {ActionBar} actionBar ActionBar to set
     */
    set(actionBar: ActionBar): void {
        const changed = new ActionBarStructureChanged();
        this._actionButton = actionBar.button;
        changed.actionBar = {
            placement: actionBar.placement,
            button: new ActionBarActionForMessage(
                actionBar.button.id,
                actionBar.button.text,
                actionBar.button.icon || ''
            ),
        };
        this._messenger.publish(changed);
    }
}
