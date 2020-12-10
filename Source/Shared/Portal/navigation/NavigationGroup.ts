// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { NavigationItem } from './NavigationItem';

export interface NavigationGroup {
    name: string;
    items: NavigationItem[];
}
