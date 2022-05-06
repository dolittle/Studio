// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { ButtonText } from './buttonText';

export type OnAdd = (event) => void;
export type OnCancel = () => void;

export interface SelectFileConfirmationModalProps {
    open: boolean,
    fileName: string,
    onCancel: OnCancel,
    onAdd: OnAdd,
    disableAdd: boolean,
    fileSize?: number,
}

export function SelectFileConfirmationModal(props: SelectFileConfirmationModalProps) {
    const [open, setOpen] = useState(props.open);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <DialogTitle id='modal-modal-title'>Add File?</DialogTitle>
            <DialogContent>
                <DialogContentText id="modal-modal-description">
                    Confirm you would like to add the following file:
                    <br />
                    <br />
                    {props.fileName} {props.fileSize} bytes
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ButtonText buttonType='secondary' onClick={props.onCancel}>cancel</ButtonText>
                <ButtonText onClick={props.onAdd} disabled={props.disableAdd}>add</ButtonText>
            </DialogActions>
        </Dialog>
    );
};
