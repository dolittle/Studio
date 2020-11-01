// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IMessenger } from '@shared/mvvm';
import { injectable, singleton } from 'tsyringe';

import { ToolbarItem } from './ToolbarItem';
import { ToolbarItemForMessage } from './ToolbarItemForMessage';
import { ToolbarItemsChanged } from './ToolbarItemsChanged';

@injectable()
@singleton()
export class ToolbarItems {
    constructor(private readonly _messenger: IMessenger) {
    }

    setItems(items: ToolbarItem[]): void {
        const itemsForMessage = items.map(_ => new ToolbarItemForMessage(_.id, _.text, _.icon || ''));
        this._messenger.publish(new ToolbarItemsChanged(itemsForMessage));
    }
}