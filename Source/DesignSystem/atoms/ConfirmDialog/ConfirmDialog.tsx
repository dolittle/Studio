// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import Draggable from 'react-draggable';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, PaperProps } from '@mui/material';

import { Button, IconButton } from '@dolittle/design-system';

const styles = {
    title: {
        typography: 'h6',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'move',
    },
    description: {
        typography: 'body1',
        color: 'text.primary',
        mb: 2.25,
    },
};

export type ConfirmDialogProps = {
    id: string;
    title: string;
    description?: string;
    children?: React.ReactNode;
    cancelText?: string;
    confirmText: string;
    isOpen?: boolean;
    onCancel: () => void;
    onConfirm: () => void;
};

export const ConfirmDialog = ({ id, title, description, children, cancelText, confirmText, isOpen, onCancel, onConfirm }: ConfirmDialogProps) =>
    <Dialog
        open={isOpen ?? false}
        onClose={onCancel}
        aria-labelledby={`${id}-dialog-title`}
        aria-describedby={`${id}-dialog-description`}
        PaperComponent={(props: PaperProps) =>
            <Draggable handle={`#${id}-dialog-title`} cancel={'[class*="MuiDialogContent-root"]'}>
                <Paper {...props} />
            </Draggable>
        }
    >
        <DialogTitle id={`${id}-dialog-title`} sx={styles.title}>
            {title}
            <IconButton ariaLabel='Close dialog' edge='end' onClick={onCancel} />
        </DialogTitle>

        <DialogContent sx={{ typography: 'body2' }}>
            <DialogContentText id={`${id}-dialog-description`} sx={styles.description}>{description}</DialogContentText>
            {children}
        </DialogContent>

        <DialogActions sx={{ mr: 1 }}>
            <Button onClick={onCancel} label={cancelText ?? 'Cancel'} color='subtle' />
            <Button onClick={onConfirm} label={confirmText} />
        </DialogActions>
    </Dialog>;
