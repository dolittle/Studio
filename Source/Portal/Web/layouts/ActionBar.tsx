// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react';
import { Guid } from '@dolittle/rudiments';
import { withViewModel } from '@dolittle/vanir-web';
import { ActionBarAction } from '@shared/portal';
import { ActionBarViewModel } from './ActionBarViewModel';

export const ActionBar = withViewModel(ActionBarViewModel, ({ viewModel }) => {
    return (
        <>
            {viewModel.actionBar && (
                <CommandBar items={buildCommandBarItems(viewModel.actionBar.button)} />
            )}
        </>
    );
});

function buildCommandBarItems(action: ActionBarAction): ICommandBarItemProps[] {
    return [
        {
            key: Guid.create().toString(),
            text: action.text,
            iconProps: { iconName: action.icon },
            onClick: () => action.onTriggered?.(),
            disabled: true
        },
    ];
}
