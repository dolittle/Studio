// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Alert, AlertTitle, SxProps, Typography } from '@mui/material';

import { IconButton } from '@dolittle/design-system/atoms/IconButton/IconButton';

export type AlertBoxProps = {
    severity: 'error' | 'warning' | 'info' | 'success';
    title: string;
    message: React.ReactElement | string;
    isDismissable?: boolean;
    onDismiss?: () => void;
    sx?: SxProps;
};

export const AlertBox = ({ severity, isDismissable, onDismiss, sx, title, message }: AlertBoxProps) =>
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
