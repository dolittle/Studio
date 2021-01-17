// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { IDialogProps, DialogResult } from '@dolittle/vanir-react';
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
    const [isNameValid, setIsNameValid] = useState(false);
    const [isTenantValid, setIsTenantValid] = useState(false);
    const [isContainerRegistryValid, setIsContainerRegistryValid] = useState(false);
    const [name, setName] = useState('');
    const [tenant, setTenant] = useState('');
    const [license, setLicense] = useState('MIT');
    const [containerRegistry, setContainerRegistry] = useState('');
    const [portal, setPortal] = useState(true);


    function create() {
        const output: ICreateApplicationDialogOutput = {
            path: props.input.path,
            name,
            tenant,
            license,
            containerRegistry,
            portal
        };
        props.onClose(DialogResult.Success, output);
    }

    function cancel() {
        props.onClose(DialogResult.Cancelled);
    }

    const licenses: IDropdownOption[] = [
        { key: 'MIT', text: 'MIT' },
        { key: 'ISC', text: 'ISC' },
        { key: 'BSD-3-Clause', text: 'BSD-3-Clause' },
        { key: 'Apache-2.0', text: 'Apache-2.0' },
        { key: 'GPL-3.0', text: 'GPL-3.0' },
        { key: 'UNLICENSED', text: 'UNLICENSED' }
    ];

    function validateString(input: string) {
        return input.length === 0 ? 'Required' : '';
    }

    function handleNameValidationResult(message: string | JSX.Element, value?: string) {
        setIsNameValid(message.toString().length === 0);
    }

    function handleTenantValidationResult(message: string | JSX.Element, value?: string) {
        setIsTenantValid(message.toString().length === 0);
    }

    function handleContainerRegistryValidationResult(message: string | JSX.Element, value?: string) {
        setIsContainerRegistryValid(message.toString().length === 0);
    }

    return (
        <Dialog
            hidden={!props.visible}
            onDismiss={create}
            dialogContentProps={dialogContentProps}>

            <Stack tokens={{ childrenGap: 10 }}>
                <TextField label="Name" required onChange={(e, value) => setName(value!)} onGetErrorMessage={validateString} onNotifyValidationResult={handleNameValidationResult} />
                <TextField label="Tenant" required onChange={(e, value) => setTenant(value!)} onGetErrorMessage={validateString} onNotifyValidationResult={handleTenantValidationResult} />
                <Dropdown label="License" options={licenses} onChanged={(e, index) => setLicense(licenses[index!].text)} defaultSelectedKey="MIT" />
                <TextField label="Container registry" required onChange={(e, value) => setContainerRegistry(value!)} onGetErrorMessage={validateString} onNotifyValidationResult={handleContainerRegistryValidationResult} />
                <Checkbox label="Include portal" defaultChecked onChange={(e, value) => setPortal(value!)} />
            </Stack>

            <DialogFooter>
                <PrimaryButton onClick={create} text="Create" disabled={!(isNameValid && isTenantValid && isContainerRegistryValid)} />
                <DefaultButton onClick={cancel} text="Cancel" />
            </DialogFooter>
        </Dialog>
    );
};
