// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ReactElement, useEffect, useState } from 'react';

import { Alert, Collapse, SxProps, Typography } from '@mui/material';

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
     * Convention is to NOT use a period at the end of the title.
     * @default <AlertBoxErrorTitle />
     */
    title?: string;

    /**
     * The message of the alert.
     *
     * Message can be a `string` or a `React element`. Leave empty to use the default {@link AlertBoxErrorMessage}.
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
 * An alert box component that displays an alert with a title and a message.
 * @param {AlertBoxProps} props - The {@link AlertBoxProps}.
 * @returns A {@link AlertBox} component.
 */
export const AlertBox = ({ severity, title, message, isDismissible, isOpen = true, onDismissed, sx }: AlertBoxProps) => {
    const [isAlertBoxOpen, setIsAlertBoxOpen] = useState(isOpen);

    useEffect(() => {
        setIsAlertBoxOpen(isOpen);
    }, [isOpen]);

    const handleClose = () => {
        setIsAlertBoxOpen(false);
        onDismissed?.();
    };

    return (
        <Collapse component='section' in={isAlertBoxOpen}>
            <Alert
                variant='outlined'
                severity={severity ?? 'error'}
                action={isDismissible ? <IconButton tooltipText='Dismiss alert' onClick={handleClose} /> : undefined}
                sx={{ display: 'inline-flex', ...sx }}
            >
                <Typography gutterBottom>{title ?? AlertBoxErrorTitle}</Typography>
                <Typography variant='body2'>{message ?? <AlertBoxErrorMessage />}</Typography>
            </Alert>
        </Collapse>
    );
};
