// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Button } from '@dolittle/design-system/atoms/Button/Button';

import { IconButton, Dialog as MuiDialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

type DialogProps = {
    id: string;
    open?: boolean | false;
    title: string;
    description: string;
    cancelText: string;
    confirmText: string;
    onClose: () => void;
    handleConfirm: () => void;
};

export const Dialog = (props: DialogProps) =>
    <MuiDialog
        open={props.open || false}
        onClose={props.onClose}
        aria-labelledby={`${props.id}-title`}
        aria-describedby={`${props.id}-description`}
    >
        <DialogTitle id={`${props.id}-title`} variant='h6'>
            {props.title}
            <IconButton
                onClick={props.onClose}
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
            <Button onClick={props.onClose} label={props.cancelText} variant='text' sx={{ color: 'text.primary' }} />
            <Button onClick={props.handleConfirm} label={props.confirmText} variant='text' />
        </DialogActions>
    </MuiDialog>;
