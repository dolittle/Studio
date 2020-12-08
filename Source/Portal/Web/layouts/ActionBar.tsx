// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react';
import { Guid } from '@dolittle/rudiments';
import { withViewModel } from '@shared/mvvm';
import { ActionButton } from '@shared/portal';
import { ActionBarViewModel } from './ActionBarViewModel';

export const ActionBar = withViewModel(ActionBarViewModel, ({ viewModel }) => {
    return (
        <>
            {viewModel.actionBar && (
                <CommandBar
                    items={buildCommandBarItems(
                        viewModel.actionBar?.button,
                        viewModel.actionButtonClicked
                    )}
                />
            )}
        </>
    );
});

function buildCommandBarItems(
    actionButton: ActionButton,
    actionHandler: () => void
): ICommandBarItemProps[] {
    return [
        {
            key: Guid.create().toString(),
            text: actionButton.text,
            iconProps: { iconName: actionButton.icon },
            onClick: () => actionHandler(),
        },
    ];
}
