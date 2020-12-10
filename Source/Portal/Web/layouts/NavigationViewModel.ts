// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { NavigationStructure } from './NavigationStructure';
import { injectable } from 'tsyringe';
import { NavigationGroup } from '@shared/portal';

@injectable()
export class NavigationViewModel {
    groups: NavigationGroup[] = [];

    constructor(private readonly _navigation: NavigationStructure) {
        _navigation.groups.subscribe((_) => (this.groups = _));
    }
}
