// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { Dialog, DialogFooter, DefaultButton, PrimaryButton, TextField, IDialogContentProps, DialogType } from '@fluentui/react';
import { IDialogProps, DialogResult } from '@dolittle/vanir-react';

export type CreateApplicationOutput = {
    name: string;
};

export const CreateApplication = (props: IDialogProps<any, CreateApplicationOutput>) => {
    const [name, setName] = useState('');

    const dialogContentProps: IDialogContentProps = {
        type: DialogType.largeHeader,
        title: 'Create application'
    };

    const done = () => {
        props.onClose(DialogResult.Success, {
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
            <TextField label="Application name" onChange={(e, nv) => setName(nv!)} />

            <DialogFooter>
                <PrimaryButton onClick={done}>Ok</PrimaryButton>
                <DefaultButton onClick={cancel}>Cancel</DefaultButton>
            </DialogFooter>
        </Dialog>
    );
};
