// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { NavigationActionBar } from './NavigationActionBar';
import { NavigationActionBarForMessage } from './NavigationActionBarForMessage';
import { NavigationGroup } from './NavigationGroup';

export class NavigationStructureChanged {
    actionBar?: NavigationActionBarForMessage | undefined;
    groups: NavigationGroup[] = [];
}
