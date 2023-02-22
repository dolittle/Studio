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
    /**
     * Required. The id is used to identify the dialog and its children. It is used for accessibility and testing.
     *
     * It should be unique for each dialog.
     */
    id: string;

    /**
     *  The title should capture the essence of the message. It should be short and to the point.
     *
     *  Do not repeat the body information in the title of the dialog.
     */
    title?: string;

    /**
     * Required. The description should provide more information about the action that is going to be made.
     */
    description: string;

    /**
     * It can be used to provide a list of items that will be affected by the action.
     */
    children?: React.ReactNode;

    /**
     * The cancel text that dismisses the dialog.
     * @default Cancel
     */
    cancelText?: string;

    /**
     * If the action or output is irreversible or will cause significant changes, consider using a Danger color.
     * @default primary
     */
    confirmTextColor?: 'primary' | 'subtle' | 'error' | 'success' | 'warning';


    confirmText: string;

    /**
     * The dialog will be open if this is true.
     * @default false
     */
    isOpen?: boolean;

    /**
     * The callback that is called when the dialog is closed.
     */
    onCancel: () => void;

    /**
     * The callback that is called when the dialog is confirmed.
     */
    onConfirm: () => void;
};

export const ConfirmDialog = ({ id, title, description, children, confirmTextColor, cancelText, confirmText, isOpen, onCancel, onConfirm }: ConfirmDialogProps) =>
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
            <Button onClick={onConfirm} label={confirmText} color={confirmTextColor ?? 'primary'} />
        </DialogActions>
    </Dialog>;
