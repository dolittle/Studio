// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { NavigationStructure } from './NavigationStructure';
import { injectable } from 'tsyringe';
import { INavigator, NavigationGroup } from '@dolittle/vanir-web';
@injectable()
export class NavigationViewModel {
    groups: NavigationGroup[] = [];

    constructor(private readonly _navigation: NavigationStructure, private readonly _navigator: INavigator) {
        _navigation.groups.subscribe((_) => (this.groups = _));
    }

    navigateTo(path: string) {
        this._navigator.navigateTo(path);
    }
}
