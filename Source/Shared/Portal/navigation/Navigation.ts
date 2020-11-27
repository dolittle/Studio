// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IMessenger } from '@shared/mvvm';
import { injectable, singleton } from 'tsyringe';
import { NavigationGroup } from './NavigationGroup';
import { NavigationStructureChanged } from './NavigationStructureChanged';
import { NavigationActionBar } from './NavigationActionBar';
import { NavigationButtonForMessage } from './NavigationButtonForMessage';
import { NavigationButton } from './NavigationButton';
import { NavigationButtonWasClicked } from './NavigationButtonWasClicked';
import { NavigationActionBarForMessage } from './NavigationActionBarForMessage';

export type NavigationChanged = (groups: NavigationGroup[], actionButton?: NavigationActionBarForMessage) => void;

/**
 * Represents the system for working with the navigational structure of a microservice.
 */
@singleton()
@injectable()
export class Navigation {

    private _navigationActionButton?: NavigationButton;

    /**
     * Initializes a new instance of {@link Navigation}.
     * @param {IMessenger} _messenger Messenger to use for publishing messages.
     */
    constructor(private readonly _messenger: IMessenger) {
        console.log('Shared/Portal/Navigation: Subscribing to NavigationActionButtonWasClicked');
        _messenger.subscribeTo(NavigationButtonWasClicked, (_) => {
            console.log('Shared/Portal/Navigation: Handle NavigationActionButtonWasClicked');
            console.log(this._navigationActionButton);
            this._navigationActionButton?.onClick?.();
        });
    }

    /**
     * Sets the navigation structure for the portal with groups.
     * @param {NavigationGroup[]} groups Groups to set.
     * @param {NavigationActionBar} actionBar? ActionBar to set
     */
    set(groups: NavigationGroup[], actionBar?: NavigationActionBar): void {
        const changed = new NavigationStructureChanged();
        if(actionBar){
            this._navigationActionButton = actionBar.button;
            console.log('Shared/Portal/Navigation: Setting NavigationStructure.actionBar');
            changed.actionBar = {
                placement: actionBar.placement,
                button: new NavigationButtonForMessage(actionBar.button.id, actionBar.button.text, actionBar.button.icon || '')
            };
        }
        console.log('Shared/Portal/Navigation: Setting NavigationStructure.groups');
        changed.groups = groups;
        console.log('Shared/Portal/Navigation: Publishing NavigationStructureChanged');
        this._messenger.publish(changed);
    }

    /**
     * Hooks up a callback to be called when navigation structure changes.
     * @param callback Callback that gets called when the navigation structure changes
     */
    onChanged(callback: NavigationChanged) {
        console.log('Shared/Portal/Navigation: Subscribing to NavigationStructureChanged');
        this._messenger.subscribeTo(NavigationStructureChanged, (_) => {
            console.log('Shared/Portal/Navigation: Handle NavigationStructureChanged');
            callback(_.groups, _.actionBar);
        });
    }
}
