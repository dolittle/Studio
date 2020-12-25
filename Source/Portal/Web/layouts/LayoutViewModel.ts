// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IMessenger } from '@dolittle/vanir-web';
import { injectable } from 'tsyringe';
import { BeforeNavigation } from './BeforeNavigation';
import { ToolbarItems } from './ToolbarItems';

@injectable()
export class LayoutViewModel {
    hasToolbarItems: boolean = false;

    constructor(private readonly _messenger: IMessenger, private readonly _toolbarItems: ToolbarItems) {
        _messenger.subscribeTo(BeforeNavigation, _ => this.hasToolbarItems = false);
        _toolbarItems.items.subscribe(_ => this.hasToolbarItems = _.length > 0);
    }
}