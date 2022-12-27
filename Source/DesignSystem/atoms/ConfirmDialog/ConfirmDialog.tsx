// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Button } from '@dolittle/design-system/atoms/Button';

import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

type ConfirmDialogProps = {
    id: string;
    isOpen?: boolean;
    title: string;
    description?: string;
    children?: React.ReactNode;
    cancelText: string;
    confirmText: string;
    handleCancel: () => void;
    handleConfirm: () => void;
};

export const ConfirmDialog = ({ isOpen, id, title, description, children, handleCancel, cancelText, handleConfirm, confirmText }: ConfirmDialogProps) =>
    <Dialog
        open={isOpen || false}
        onClose={handleCancel}
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
    >
        <DialogTitle id={`${id}-title`} variant='h6'>
            {title}
            <IconButton
                onClick={handleCancel}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: 'text.primary'
                }}>
                {<CloseRounded />}
            </IconButton>
        </DialogTitle>

        <DialogContent>
            <DialogContentText id={`${id}-description`} variant='body1' sx={{ color: 'text.primary', mb: 2.25 }}>
                {description}
            </DialogContentText>

            {children}
        </DialogContent>

        <DialogActions sx={{ mr: 1 }}>
            <Button onClick={handleCancel} label={cancelText} variant='text' sx={{ color: 'text.primary' }} />
            <Button onClick={handleConfirm} label={confirmText} variant='text' />
        </DialogActions>
    </Dialog>;
