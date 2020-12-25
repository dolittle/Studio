// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ToolbarItem, ToolbarItems } from '@shared/portal';
import { ToolbarProps } from './ToolbarProps';
import { IViewContext } from '@dolittle/vanir-react';
import { injectable } from 'tsyringe';

@injectable()
export class ToolbarViewModel {

    constructor(private readonly _toolbarItems: ToolbarItems) {

    }

    activate(viewContext: IViewContext<ToolbarViewModel, ToolbarProps>) {
        if( !viewContext.props.children) {
            return;
        }

   const items = Array.isArray(viewContext.props.children)
            ? viewContext.props.children
            : [viewContext.props.children];

        const toolbarItems = items.map(_ => {
            const props = (_.props);
            return new ToolbarItem(
                props.title,
                props.icon,
                props.onClick
            );
        })

        this._toolbarItems.setItems(toolbarItems);
    }
}
