// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ReactElement, useState, useEffect } from 'react';

import { Alert, AlertTitle, Collapse, SxProps, Typography } from '@mui/material';

import { IconButton, Link } from '@dolittle/design-system';

export const AlertBoxErrorMessage = () =>
    <>
        Please try again later. If problem persists, please contact <Link href='#' message='Dolittle support'
            ariaLabel='To learn more, visit our website which opens in a new window.' />.
    </>;

export const AlertBoxInfoMessage = () =>
    <>
        For more information, please contact <Link href='#' message='Dolittle support'
            ariaLabel='To learn more, visit our website which opens in a new window.' />.
    </>;

/**
 * The props for a {@link AlertBox} component.
 */
export type AlertBoxProps = {
    /**
     * The severity of the alert.
     * @default error
     */
    severity?: 'error' | 'warning' | 'info' | 'success';

    /**
     * Required. The title of the alert.
     *
     * Convension is to NOT use a period at the end of the title.
     */
    title: string;

    /**
     * Required. The message of the alert.
     *
     * Link component can be used to add links to the message.
     */
    message: string | ReactElement;

    /**
     * Set if the alert is dismissible.
     *
     * This will put the close, 'x', icon to the top right.
     * @default false
     */
    isDismissible?: boolean;

    /**
     * Set alert box as closed with 'false' value and open alert conditionally inside the parent component.
     * @default true
     */
    isOpen?: boolean;

    /**
     * If alert box is set to be closed conditionally (isOpen=false) inside the parent component,
     * this callback function can be called if the alert should be dismissed.
     * @default undefined
     */
    onDismissed?: () => void;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;
};

/**
 * A alert box component.
 * @param {...AlertBoxProps} props - The {@link AlertBoxProps}.
 * @returns {ReactElement} A new {@link AlertBox} component.
 * @example
 * <AlertBox
 *    severity='error'
 *    title='Error'
 *    message='Something went wrong.'
 * />
 */
export const AlertBox = ({ severity, title, message, isDismissible, isOpen = true, onDismissed, sx }: AlertBoxProps): ReactElement => {
    const [open, setOpen] = useState(isOpen);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    return (
        <Collapse in={open}>
            <Alert
                variant='outlined'
                severity={severity || 'error'}
                role='alert'
                action={isDismissible &&
                    <IconButton
                        label='Dismiss alert'
                        onClick={() => {
                            setOpen(false);
                            onDismissed?.();
                        }}
                    />}
                sx={{
                    'display': 'inline-flex',
                    'borderColor': !severity || severity === 'error' ? 'error.dark' : null,
                    'textAlign': 'left',
                    '& .MuiAlert-action': { pt: 0 },
                    ...sx
                }}
            >
                <AlertTitle>{title}</AlertTitle>
                <Typography variant='body2'>{message}</Typography>
            </Alert>
        </Collapse>
    );
};
