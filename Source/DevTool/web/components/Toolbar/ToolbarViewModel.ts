// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ToolbarItems } from './ToolbarItems';
import { injectable } from 'tsyringe';
import { ToolbarItem } from './ToolbarItem';

@injectable()
export class ToolbarViewModel {
    items: ToolbarItem[] = [];

    constructor(items: ToolbarItems) {
        items.current.subscribe(_ => this.items = _);
    }
}
