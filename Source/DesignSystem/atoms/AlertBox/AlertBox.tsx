// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ReactElement, useState, useEffect } from 'react';

import { Alert, AlertTitle, Collapse, SxProps, Typography } from '@mui/material';

import { IconButton, Link } from '@dolittle/design-system';

/**
 * The props for the {@link AlertBox} component.
 */
export type AlertBoxProps = {
    /**
     * The severity of the alert.
     * @default error
     */
    severity?: 'error' | 'warning' | 'info' | 'success';

    /**
     * The title of the alert.
     *
     * Convension is to NOT use a period at the end of the title.
     */
    title: string;

    /**
     * The message of the alert.
     *
     * {@link AlertBoxErrorMessage} and {@link AlertBoxInfoMessage} can be used as examples.
     *
     * {@link Link} component can also be used to add links to the message.
     */
    message: string | ReactElement;

    /**
     * Set this to be `true` if the alert should be dismissible.
     *
     * This places the close icon in the upper right corner.
     * @default false
     */
    isDismissible?: boolean;

    /**
     * Set alert box as closed with `false` value and open alert conditionally inside the parent component.
     * @default true
     */
    isOpen?: boolean;

    /**
     * Callback function that is called when the alert is dismissed.
     *
     * @default undefined
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
                action={isDismissible &&
                    <IconButton ariaLabel='Dismiss alert' onClick={handleClose} />
                }
                sx={{ display: 'inline-flex', ...sx }}
            >
                <AlertTitle>{title}</AlertTitle>
                <Typography variant='body2'>{message}</Typography>
            </Alert>
        </Collapse>
    );
};
