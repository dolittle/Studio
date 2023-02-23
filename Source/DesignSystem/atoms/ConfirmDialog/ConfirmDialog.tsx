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
    },
};

/**
 * The props for the {@link ConfirmDialog} component.
 */
export type ConfirmDialogProps = {
    /**
     * The id is used to identify the dialog and its children. It is used for accessibility and testing.
     *
     * It should be unique for each dialog.
     *
     * The id is prefixed to the following elements:
     *
     * {`id`}-dialog-title
     *
     * {`id`}-dialog-description
     */
    id: string;

    /**
     * The title should capture the essence of the description. It should be short and to the point.
     * 
     * Do not repeat description information in the title of the dialog.
     */
    title?: string;

    /**
     * The description should provide more information about the action that is going to be made.
     */
    description: string;

    /**
     * The children can be used to provide a list of items that will be affected by the action.
     *
     * The children can also be a form or any other React component.
     */
    children?: React.ReactNode;

    /**
     * Cancel button text that dismisses the dialog.
     * @default Cancel
     */
    cancelBtnText?: string;

    /**
     * The confirm button should be the primary action in the dialog. It should be the action that the user is most likely to take.
     *
     * If the action or output is irreversible or will cause significant changes, consider using color to call attention 
     * to the required or suggested action if necessary.
     * @default primary
     */
    confirmBtnColor?: 'primary' | 'subtle' | 'secondary' | 'error' | 'warning';

    /**
     * Confirm button text.
     */
    confirmBtnText: string;

    /**
     * The dialog will be open if this is set to true.
     * 
     * Manage this state from the parent component.
     * @default false
     */
    isOpen?: boolean;

    /**
     * The callback that is called when the dialog is dismissed.
     */
    onCancel: () => void;

    /**
     * The callback that is called when the dialog is confirmed.
     */
    onConfirm: () => void;
};

/**
 * The confirm dialog is used to confirm an action or output.
 * @param {ConfirmDialogProps} props - The {@link ConfirmDialogProps} that contains the properties for the confirm dialog.
 * @returns A {@link ConfirmDialog} component.
 */
export const ConfirmDialog = ({ id, title, description, children, confirmBtnColor, cancelBtnText, confirmBtnText, isOpen, onCancel, onConfirm }: ConfirmDialogProps) =>
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
            <Button onClick={onCancel} label={cancelBtnText ?? 'Cancel'} color='subtle' />
            <Button onClick={onConfirm} label={confirmBtnText} color={confirmBtnColor ?? 'primary'} />
        </DialogActions>
    </Dialog>;
