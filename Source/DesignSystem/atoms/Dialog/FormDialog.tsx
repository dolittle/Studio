// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import Draggable from 'react-draggable';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, PaperProps, Stack } from '@mui/material';

import { Button, Form, IconButton, LoadingSpinner } from '../../index';

const styles = {
    title: {
        typography: 'h6',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'move',
    },
    description: {
        pb: 2,
        typography: 'body1',
        color: 'text.primary',
    },
};

/**
 * The props for the {@link FormDialog} component.
 */
export type FormDialogProps = {
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
     * The dialog will be open if this is set to true.
     *
     * Manage this state from the parent component.
     * @default false
     */
    isOpen: boolean;

    /**
     * The title should capture the essence of the description. It should be short and to the point.
     *
     * Do not repeat description information in the title of the dialog.
     */
    title: string;

    /**
     * The description should provide more information about the action that is going to be made.
     */
    description?: string;

    /**
     * Add form fields or any other React component as children.
     */
    children: React.ReactNode;

    /**
     * Whether or not the dialog is in loading state.
     */
    isLoading?: boolean;

    /**
     * The text for the cancel button.
     *
     * @default Cancel
     */
    cancelButtonLabel?: string;

    /**
     * Whether or not to hide the cancel button.
     *
     * @default false
     */
    hideCancelButton?: boolean;

    /**
     * The callback that is called when the dialog is dismissed.
     */
    onCancel: () => void;

    /**
     * The confirm button should be the primary action in the dialog. It should be the action that the user is most likely to take.
     */
    submitBtnLabel: string;

    /**
     * Whether or not to hide the submit button.
     *
     * @default false
     */
    hideSubmitButton?: boolean;

    /**
     * The callback that is called when the dialog is confirmed.
     */
    onSubmit: (values: any) => void;

    /**
     * The callback that is called when the dialog is closed.
     * @default onCancel
     */
    onClose?: () => void;

    /**
     * The initial values for the form.
     *
     * For more information about forms, see {@link Form}.
     */
    formInitialValues: any;
};

/**
 * The form dialog is used to display a form in a dialog.
 * @param {FormDialogProps} props - The {@link FormDialogProps}.
 * @returns A {@link FormDialog} component.
 */
export const FormDialog = ({ id, isOpen, title, description, isLoading, children, cancelButtonLabel, hideCancelButton, onCancel, submitBtnLabel, hideSubmitButton, onSubmit, onClose, formInitialValues }: FormDialogProps) =>
    <Dialog
        open={isOpen ?? false}
        onClose={onClose ?? onCancel}
        aria-labelledby={`${id}-dialog-title`}
        aria-describedby={`${id}-dialog-description`}
        PaperComponent={(props: PaperProps) =>
            <Draggable handle={`#${id}-dialog-title`} cancel={'[class*="MuiDialogContent-root"]'}>
                <Paper {...props} />
            </Draggable>
        }
    >
        {isLoading && <LoadingSpinner fullPage />}

        <Form initialValues={formInitialValues} onSubmit={onSubmit} sx={{ minInlineSize: { sm: 500 } }}>
            <DialogTitle id={`${id}-dialog-title`} sx={styles.title}>
                {title}
                <IconButton tooltipText='Close dialog' edge='end' onClick={onClose ?? onCancel} />
            </DialogTitle>

            <DialogContent sx={{ typography: 'body2' }}>
                {description &&
                    <DialogContentText id={`${id}-dialog-description`} sx={styles.description}>
                        {description}
                    </DialogContentText>
                }

                <Stack component='section' sx={{ mt: 2, gap: 2 }}>
                    {children}
                </Stack>
            </DialogContent>

            <DialogActions sx={{ mr: 1 }}>
                {!hideCancelButton && <Button label={cancelButtonLabel ? cancelButtonLabel : 'Cancel'} color='subtle' onClick={onCancel} />}
                {!hideSubmitButton && <Button label={submitBtnLabel} type='submit' />}
            </DialogActions>
        </Form>
    </Dialog>;
