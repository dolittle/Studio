// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ReactElement } from 'react';

import { Alert, AlertTitle, SxProps, Typography } from '@mui/material';

import { IconButton } from '@dolittle/design-system/atoms/IconButton/IconButton';

export type AlertBoxProps = {
    /**
     * Required. The severity of the alert.
     */
    severity: 'error' | 'warning' | 'info' | 'success';

    /**
     * Required. The title of the alert.
     * @type {string}
     */
    title: string;

    /**
     * Required. The message of the alert.
     * @type {string}
     * @type {ReactElement}
     */
    message: string | ReactElement;

    /**
     * Set if the alert is dismissable.
     * @default false
     * @type {boolean}
     */
    isDismissable?: boolean;
    onDismiss?: () => void;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     * @type {SxProps}
     */
    sx?: SxProps;
};

/**
 * A AlertBox component.
 * @param {...AlertBoxProps} props - The {@link AlertBoxProps}.
 * @returns {ReactElement} A new {@link AlertBox} component.
 * @example
 * <AlertBox
 *    severity='error'
 *    title='Error'
 *    message='Something went wrong.'
 * />
 */
export const AlertBox = ({ severity, isDismissable, onDismiss, sx, title, message }: AlertBoxProps): ReactElement =>
    <Alert
        variant='outlined'
        severity={severity}
        action={isDismissable && <IconButton onClick={onDismiss} />}
        sx={{
            'display': 'inline-flex',
            'borderColor': severity === 'error' ? 'error.dark' : null,
            '& .MuiAlert-action': { pt: 0 },
            ...sx
        }}
    >
        <AlertTitle>{title}</AlertTitle>
        <Typography variant='body2'>{message}</Typography>
    </Alert>;
