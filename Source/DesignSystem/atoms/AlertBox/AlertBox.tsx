// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ReactElement, useState, useEffect } from 'react';

import { Alert, AlertTitle, Collapse, SxProps, Typography } from '@mui/material';

import { IconButton } from '../../index';

import { AlertBoxErrorMessage, AlertBoxErrorTitle } from './helpers';

/**
 * The props for the {@link AlertBox} component.
 */
export type AlertBoxProps = {
    /**
     * The severity of the alert.
     *
     * Leave empty to use the default 'error' severity.
     * @default error
     */
    severity?: 'error' | 'warning' | 'info' | 'success';

    /**
     * The title of the alert.
     *
     * Leave empty to use the default {@link AlertBoxErrorTitle}.
     *
     * convention is to NOT use a period at the end of the title.
     * @default <AlertBoxErrorTitle />
     */
    title?: string;

    /**
     * The message of the alert.
     *
     * Message can be a string or a React element. Leave empty to use the default {@link AlertBoxErrorMessage}.
     * @default <AlertBoxErrorMessage />
     */
    message?: string | ReactElement;

    /**
     * Set this to be `true` if the alert should be dismissible.
     *
     * This places the 'close' icon in the upper right corner.
     * @default false
     */
    isDismissible?: boolean;

    /**
     * Set alert box as closed with `false` value and manage state in parent component.
     * @default true
     */
    isOpen?: boolean;

    /**
     * Callback function that is called when the alert is dismissed.
     */
    onDismissed?: () => void;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;
};

/**
 * Alert box component is used to display an alert message.
 * @param {AlertBoxProps} props - The {@link AlertBoxProps} that contains the properties for the alert box.
 * @returns A {@link AlertBox} component.
 */
export const AlertBox = ({ severity, title, message, isDismissible, isOpen = true, onDismissed, sx }: AlertBoxProps) => {
    const [open, setOpen] = useState(isOpen);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    const handleClose = () => {
        setOpen(false);
        onDismissed?.();
    };

    return (
        <Collapse in={open}>
            <Alert
                variant='outlined'
                severity={severity ?? 'error'}
                action={isDismissible ? <IconButton tooltipText='Dismiss alert' onClick={handleClose} /> : undefined}
                sx={{ display: 'inline-flex', ...sx }}
            >
                <AlertTitle>{title ?? AlertBoxErrorTitle}</AlertTitle>
                <Typography variant='body2'>{message ?? <AlertBoxErrorMessage />}</Typography>
            </Alert>
        </Collapse>
    );
};
