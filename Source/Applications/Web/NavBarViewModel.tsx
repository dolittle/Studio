// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { ActionBar, ActionBarBroker, Navigation, NavigationGroup } from '@shared/portal';
import { injectable } from 'tsyringe';

@injectable()
export class NavBarViewModel {
    constructor(public navigation: Navigation, public actionBar: ActionBarBroker) {}

    setNavigation(navigationGroups: NavigationGroup[]) {
        this.navigation.set(navigationGroups);
    }

    setActionBar(actionBar: ActionBar) {
        this.actionBar.set(actionBar);
    }
}
