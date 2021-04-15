// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ToolbarItem, ToolbarItems } from '@shared/portal';
import { ToolbarProps } from './ToolbarProps';
import { injectable } from 'tsyringe';

@injectable()
export class ToolbarViewModel {

    constructor(private readonly _toolbarItems: ToolbarItems) {

    }

    propsChanged(props: ToolbarProps) {
        if (!props.children) {
            return;
        }

        const items = Array.isArray(props.children)
            ? props.children
            : [props.children];

        const toolbarItems = items.map(_ => {
            const props = (_.props);
            return new ToolbarItem(
                props.title,
                props.icon,
                props.onClick
            );
        });

        this._toolbarItems.setItems(toolbarItems);
    }
}
