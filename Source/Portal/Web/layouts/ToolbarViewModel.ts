// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ToolbarItem } from '@shared/portal/toolbar';
import { injectable } from 'tsyringe';
import { ToolbarItems } from './ToolbarItems';

@injectable()
export class ToolbarViewModel {
    items: ToolbarItem[] = [];

    constructor(private readonly _toolbarItems: ToolbarItems) {
        _toolbarItems.items.subscribe(_ => this.items = _);
    }
}