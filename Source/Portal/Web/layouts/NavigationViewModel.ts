// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { NavigationStructure } from './NavigationStructure';
import { injectable } from 'tsyringe';
import { INavigator, NavigationGroup, IMessenger } from '@dolittle/vanir-web';
import { NavigationGroupClicked } from '@shared/portal';
@injectable()
export class NavigationViewModel {
    groups: NavigationGroup[] = [];

    constructor(private readonly _navigation: NavigationStructure, private readonly _navigator: INavigator, private readonly _messenger: IMessenger) {
        _navigation.groups.subscribe((_) => (this.groups = _));
    }

    navigateTo(path: string) {
        this._navigator.navigateTo(path);
    }

    groupClicked(group: NavigationGroup) {
        this._messenger.publish(new NavigationGroupClicked(group.name));
    }
}
