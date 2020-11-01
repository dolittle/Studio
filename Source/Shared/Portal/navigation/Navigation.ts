// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IMessenger } from '@shared/mvvm';
import { injectable, singleton } from 'tsyringe';
import { NavigationGroup } from './NavigationGroup';
import { NavigationStructureChanged } from './NavigationStructureChanged';

export type NavigationChanged = (groups: NavigationGroup[]) => void;

/**
 * Represents the system for working with the navigational structure of a microservice.
 */
@singleton()
@injectable()
export class Navigation {

    /**
     * Initializes a new instance of {@link Navigation}.
     * @param {IMessenger} _messenger Messenger to use for publishing messages.
     */
    constructor(private readonly _messenger: IMessenger) {
    }

    /**
     * Sets the navigation structure for the portal with groups.
     * @param {NavigationGroup[]} groups Groups to set.
     */
    set(groups: NavigationGroup[]): void {
        const changed = new NavigationStructureChanged();
        changed.groups = groups;
        this._messenger.publish(changed);
    }

    /**
     * Hooks up a callback to be called when navigation structure changes.
     * @param callback Callback that gets called when the navigation structure changes
     */
    onChanged(callback: NavigationChanged) {
        this._messenger.subscribeTo(NavigationStructureChanged, _ => callback(_.groups));
    }
}
