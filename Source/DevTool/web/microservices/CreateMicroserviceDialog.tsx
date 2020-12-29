// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import {
    DialogType,
    Dialog,
    DialogFooter,
    PrimaryButton,
    DefaultButton,
    Stack,
    TextField,
    Checkbox
} from '@fluentui/react';

export interface ICreateMicroserviceProps {
    hidden: boolean;
}

const dialogStyles = { main: { maxWidth: 450 } };
const dialogContentProps = {
    type: DialogType.normal,
    title: 'Create Microservice',
    closeButtonAriaLabel: 'Close'
};


export const CreateMicroserviceDialog = (props: ICreateMicroserviceProps) => {
    function toggleHideDialog() {
    }

    return (
        <Dialog
            hidden={props.hidden}
            onDismiss={toggleHideDialog}
            dialogContentProps={dialogContentProps}>

            <Stack tokens={{ childrenGap: 10 }}>
                <TextField label="Name" required />
                <Checkbox label="Add Web frontend?" defaultChecked />
            </Stack>

            <DialogFooter>
                <PrimaryButton onClick={toggleHideDialog} text="Create" />
                <DefaultButton onClick={toggleHideDialog} text="Cancel" />
            </DialogFooter>
        </Dialog>
    );
};
