// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { NavigationStructure } from './NavigationStructure';
import { injectable } from 'tsyringe';
import { NavigationGroup, NavigationActionBar } from '@shared/portal';

@injectable()
export class NavigationViewModel {
    groups: NavigationGroup[] = [];
    actionBar?: NavigationActionBar;

    constructor(private readonly _navigation: NavigationStructure) {
        _navigation.groups.subscribe(_ => this.groups = _);
        _navigation.actionBar.subscribe(_ => this.actionBar = _);
    }

    navActionButtonClicked() {
        console.log('Portal/Web/NavigationViewModel: Clicked');
        console.log('Portal/Web/NavigationViewModel: Publishing NavigationButtonWasClicked');
        this._navigation.navigationActionButtonClicked();
    }

}
