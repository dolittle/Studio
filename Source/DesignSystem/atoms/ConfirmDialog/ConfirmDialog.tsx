// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import Draggable from 'react-draggable';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, PaperProps } from '@mui/material';

import { Button, IconButton } from '@dolittle/design-system';

export type ConfirmDialogProps = {
    id: string;
    title: string;
    description?: string;
    children?: React.ReactNode;
    cancelText: string;
    confirmText: string;
    isOpen?: boolean;
    onCancel: () => void;
    onConfirm: () => void;
};

export const ConfirmDialog = ({ id, title, description, children, cancelText, confirmText, isOpen, onCancel, onConfirm }: ConfirmDialogProps) =>
    <Dialog
        open={isOpen ?? false}
        onClose={onCancel}
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
        PaperComponent={(props: PaperProps) =>
            <Draggable handle={`#${id}-title`} cancel={'[class*="MuiDialogContent-root"]'}>
                <Paper {...props} />
            </Draggable>
        }
    >
        <DialogTitle id={`${id}-title`} variant='h6' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'move' }}>
            {title}
            <IconButton ariaLabel='Close dialog' edge='end' onClick={onCancel} />
        </DialogTitle>

        <DialogContent sx={{ typography: 'body1' }}>
            <DialogContentText id={`${id}-description`} sx={{ color: 'text.primary', mb: 2.25 }}>
                {description}
            </DialogContentText>

            {children}
        </DialogContent>

        <DialogActions sx={{ mr: 1 }}>
            <Button onClick={onCancel} label={cancelText} color='subtle' />
            <Button onClick={onConfirm} label={confirmText} />
        </DialogActions>
    </Dialog>;
