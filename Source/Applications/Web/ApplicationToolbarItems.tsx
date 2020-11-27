// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ToolbarItem, ToolbarItems } from '@shared/portal';
import React from 'react';
import { container } from 'tsyringe';

export const ApplicationToolbarItems = (props: {
    onCreateApplicationClicked: () => void;
    onAssignMicroserviceClicked: () => void;
}): JSX.Element => {
    const toolbar = container.resolve(ToolbarItems);
    toolbar.setItems([
        new ToolbarItem(
            'Assign microservice',
            'AppIconDefaultAdd',
            () => props.onAssignMicroserviceClicked()
        ),
    ]);

    return <></>;
};
