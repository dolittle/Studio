// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { ToolbarItems } from './ToolbarItems';

@injectable()
export class LayoutViewModel {
    hasToolbarItems: boolean = false;

    constructor(private readonly _toolbarItems: ToolbarItems) {
        _toolbarItems.items.subscribe(_ => this.hasToolbarItems = _.length > 0);
    }
}