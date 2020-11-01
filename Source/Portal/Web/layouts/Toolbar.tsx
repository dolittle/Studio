// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { withViewModel } from '@shared/mvvm';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react';
import React from 'react';
import { ToolbarViewModel } from './ToolbarViewModel';

export const Toolbar = withViewModel(ToolbarViewModel, ({ viewModel }) => {
    const items = viewModel.items.map(_ => {
        return {
            key: _.id,
            text: _.text,
            iconProps: {
                iconName: _.icon
            }

        } as ICommandBarItemProps;
    });

    return (
        <CommandBar items={items} />
    );
});