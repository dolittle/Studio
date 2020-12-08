// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ActionButton } from './ActionButton';
import { IMessenger } from '@shared/mvvm';
import { injectable, singleton } from 'tsyringe';
import { ActionButtonWasTriggered } from './ActionButtonWasTriggered';
import { ActionBarStructureChanged } from './ActionBarStructureChanged';
import { ActionBar } from './ActionBar';
import { ActionButtonForMessage } from './ActionButtonForMessage';

/**
 * Represents the system for working with the action bar structure of a microservice.
 */
@singleton()
@injectable()
export class ActionBarBroker {
    private _actionButton?: ActionButton;

    /**
     * Initializes a new instance of {@link ActionBarBroker}.
     * @param {IMessenger} _messenger Messenger to use for publishing messages.
     */
    constructor(private readonly _messenger: IMessenger) {
        _messenger.subscribeTo(ActionButtonWasTriggered, (_) => {
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
            button: new ActionButtonForMessage(
                actionBar.button.id,
                actionBar.button.text,
                actionBar.button.icon || ''
            ),
        };
        this._messenger.publish(changed);
    }
}
