// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable, singleton } from 'tsyringe';
import { IMessenger } from '@dolittle/vanir-web';
import { ToolbarItem } from './ToolbarItem';
import { ToolbarItemWasClicked } from './ToolbarItemWasClicked';
import { ToolbarItemForMessage } from './ToolbarItemForMessage';
import { ToolbarItemsChanged } from './ToolbarItemsChanged';

@injectable()
@singleton()
export class ToolbarItems {
    private _currentItems: ToolbarItem[] = [];

    constructor(private readonly _messenger: IMessenger) {
        _messenger.subscribeTo(ToolbarItemWasClicked, _ => {
            const item = this._currentItems.find(i => i.id === _.id);
            item?.onClick?.();
        });
    }

    setItems(items: ToolbarItem[]): void {
        this._currentItems = items;
        const itemsForMessage = items.map(_ => new ToolbarItemForMessage(_.id, _.text, _.icon || ''));
        this._messenger.publish(new ToolbarItemsChanged(itemsForMessage));
    }
}