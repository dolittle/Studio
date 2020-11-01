// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Navigation, NavigationGroup } from '@shared/portal';

@injectable()
export class NavigationViewModel {
    groups: NavigationGroup[] = [];

    constructor(private readonly _navigation: Navigation) {
        _navigation.onChanged(_ => this.groups = _);
    }
}