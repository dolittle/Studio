// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { Button, IconButton } from '@dolittle/design-system';

export type ConfirmDialogProps = {
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
        <DialogTitle id={`${id}-title`} variant='h6' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {title}
            <IconButton label='Close dialog' onClick={handleCancel} />
        </DialogTitle>

        <DialogContent>
            <DialogContentText id={`${id}-description`} variant='body1' sx={{ color: 'text.primary', mb: 2.25 }}>
                {description}
            </DialogContentText>

            {children}
        </DialogContent>

        <DialogActions sx={{ mr: 1 }}>
            <Button onClick={handleCancel} label={cancelText} secondary />
            <Button onClick={handleConfirm} label={confirmText} />
        </DialogActions>
    </Dialog>;
