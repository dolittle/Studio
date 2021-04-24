// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { Dialog, DialogFooter, DefaultButton, PrimaryButton, TextField, IDialogContentProps, DialogType, Dropdown, IDropdownProps, IDropdownOption } from '@fluentui/react';
import { IDialogProps, DialogResult, withViewModel } from '@dolittle/vanir-react';
import { CreateMicroserviceViewModel } from './CreateMicroserviceViewModel';

export type CreateMicroserviceOutput = {
    type: string;
    name: string;
};

export const CreateMicroservice = withViewModel<CreateMicroserviceViewModel, IDialogProps<any, CreateMicroserviceOutput>>(CreateMicroserviceViewModel, ({ viewModel, props }) => {
    const [type, setType] = useState('');
    const [name, setName] = useState('');

    const dialogContentProps: IDialogContentProps = {
        type: DialogType.largeHeader,
        title: 'Create microservice'
    };

    const microserviceTypesOptions: IDropdownOption[] = viewModel.microserviceTypes.map(_ => {
        return {
            key: _.id,
            text: _.name
        };
    });

    const done = () => {
        props.onClose(DialogResult.Success, {
            type,
            name
        });
    };

    const cancel = () => {
        props.onClose(DialogResult.Cancelled);
    };

    return (
        <Dialog
            minWidth={600}
            hidden={!props.visible}
            onDismiss={cancel}
            dialogContentProps={dialogContentProps}>

            <Dropdown
                placeholder="Select microservice type"
                label="Microservice type"
                options={microserviceTypesOptions} />

            <TextField label="Microservice name" onChange={(e, nv) => setName(nv!)} />

            <DialogFooter>
                <PrimaryButton onClick={done}>Ok</PrimaryButton>
                <DefaultButton onClick={cancel}>Cancel</DefaultButton>
            </DialogFooter>
        </Dialog>
    );
});
