// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { withViewModel } from '@dolittle/vanir-react';
import { ToolbarViewModel } from './ToolbarViewModel';
import { ICommandBarItemProps, CommandBar } from '@fluentui/react';

export const Toolbar = withViewModel(ToolbarViewModel, ({ viewModel }) => {
    const commandBarItems = viewModel.items.map(_ => {
        return {
            key: _.name,
            text: _.name,
            iconProps: {
                iconName: _.icon
            },
            onClick: () => _.onClick(_)
        } as ICommandBarItemProps;
    });

    if (commandBarItems.length === 0) {
        return (<></>);
    }

    // CircleStopSolid
    // CircleStop

    return (
        <CommandBar style={{ width: '100%' }} items={commandBarItems} />
    );
});
