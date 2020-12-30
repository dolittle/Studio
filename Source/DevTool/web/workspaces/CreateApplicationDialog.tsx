// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { DialogResult, IDialogProps } from '../dialogs/useDialog';
import {
    Dropdown,
    IDropdownOption,
    DialogType,
    Dialog,
    DialogFooter,
    PrimaryButton,
    DefaultButton,
    Stack,
    TextField,
    Checkbox
} from '@fluentui/react';

const dialogContentProps = {
    type: DialogType.normal,
    title: 'Create Application',
    closeButtonAriaLabel: 'Close'
};

export interface ICreateApplicationDialogInput {
    path: string;
}

export interface ICreateApplicationDialogOutput {
    path: string;
    name: string;
    tenant: string;
    license: string;
    containerRegistry: string;
    portal: boolean;
}

export const CreateApplicationDialog = (props: IDialogProps<ICreateApplicationDialogInput, ICreateApplicationDialogOutput>) => {
    const output: ICreateApplicationDialogOutput = {
        path: props.input.path,
        name: '',
        tenant: '',
        license: '',
        containerRegistry: '',
        portal: true
    };

    function create() {
        props.onClose(DialogResult.Success, output);
    }

    function cancel() {
        props.onClose(DialogResult.Cancelled, output);
    }

    const licenses: IDropdownOption[] = [
        { key: 'MIT', text: 'MIT' },
        { key: 'ISC', text: 'ISC' },
        { key: 'BSD-3-Clause', text: 'BSD-3-Clause' },
        { key: 'Apache-2.0', text: 'Apache-2.0' },
        { key: 'GPL-3.0', text: 'GPL-3.0' },
        { key: 'UNLICENSED', text: 'UNLICENSED' }
    ];

    return (
        <Dialog
            hidden={!props.visible}
            onDismiss={create}
            dialogContentProps={dialogContentProps}>

            <Stack tokens={{ childrenGap: 10 }}>
                <TextField label="Name" required onChange={(e, value) => output.name = value} />
                <TextField label="Tenant" required onChange={(e, value) => output.tenant = value} />
                <Dropdown label="License" options={licenses} onChanged={(e, index) => output.license = licenses[index].text} />
                <TextField label="Container registry" required onChange={(e, value) => output.containerRegistry = value} />
                <Checkbox label="Include portal" defaultChecked onChange={(e, value) => output.portal = value} />
            </Stack>

            <DialogFooter>
                <PrimaryButton onClick={create} text="Create" />
                <DefaultButton onClick={cancel} text="Cancel" />
            </DialogFooter>
        </Dialog>
    );
};
