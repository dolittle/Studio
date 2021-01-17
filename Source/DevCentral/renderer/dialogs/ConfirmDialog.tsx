// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { IDialogProps, DialogResult } from '@dolittle/vanir-react';
import { Dialog, DialogFooter, PrimaryButton, DefaultButton, DialogType } from '@fluentui/react';

export interface IConfirmDialogProps extends IDialogProps {
    title: string;
    message: string;
    successText: string;
    cancelText: string;
}

const ConfirmDialog = (props: IConfirmDialogProps) => {
    function success() {
        props.onClose(DialogResult.Success, {});
    }

    function cancel() {
        props.onClose(DialogResult.Cancelled, {});
    }

    const dialogContentProps = {
        type: DialogType.normal,
        title: props.title,
        subText: props.message,
        closeButtonAriaLabel: 'Close'
    };

    return (
        <Dialog
            hidden={!props.visible}
            onDismiss={success}
            dialogContentProps={dialogContentProps}>
            <DialogFooter>
                <PrimaryButton onClick={success} text={props.successText} />
                <DefaultButton onClick={cancel} text={props.cancelText} />
            </DialogFooter>
        </Dialog>
    );
};
