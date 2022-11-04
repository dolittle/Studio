// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Button } from '@dolittle/design-system/atoms/Button';

import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

type ConfirmDialogProps = {
    id: string;
    open?: boolean;
    title: string;
    description: React.ReactNode;
    cancelText: string;
    confirmText: string;
    handleCancel: () => void;
    handleConfirm: () => void;
};

export const ConfirmDialog = (props: ConfirmDialogProps) =>
    <Dialog
        open={props.open || false}
        onClose={props.handleCancel}
        aria-labelledby={`${props.id}-title`}
        aria-describedby={`${props.id}-description`}
    >
        <DialogTitle id={`${props.id}-title`} variant='h6'>
            {props.title}
            <IconButton
                onClick={props.handleCancel}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                }}>
                {<CloseRounded />}
            </IconButton>
        </DialogTitle>
        <DialogContent>
            <DialogContentText id={`${props.id}-description`} variant='body1'>
                {props.description}
            </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mr: 1 }}>
            <Button onClick={props.handleCancel} label={props.cancelText} variant='text' sx={{ color: 'text.primary' }} />
            <Button onClick={props.handleConfirm} label={props.confirmText} variant='text' />
        </DialogActions>
    </Dialog>;
