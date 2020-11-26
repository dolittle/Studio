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
            'Create application',
            'Add',
            () => props.onCreateApplicationClicked() //setShowCreateApplicationDialog(true)
        ),
        new ToolbarItem(
            'Assign microservice',
            'AppIconDefaultAdd',
            () => props.onAssignMicroserviceClicked() //setShowAssignMicroserviceDialog(true)
        ),
    ]);

    return <></>;
};
