// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Alert, AlertTitle, Link, Theme, Typography } from '@mui/material';

const styles = {
    alertWrapper: {
        'borderColor': (theme: Theme) => theme.palette.error.dark,
        'textAlign': 'left',
        '& .MuiAlert-icon': {
            color: (theme: Theme) => theme.palette.error.dark,
        }
    },
    supportLink: {
        color: (theme: Theme) => theme.palette.primary.main,
        textDecoration: 'underline'
    }
};

type NotificationProps = {
    title: string;
    sx?: {};
};

export const Notification = ({ title, sx }: NotificationProps) => (
    <Alert sx={{ ...styles.alertWrapper, ...sx }} variant="outlined" severity="error">
        <AlertTitle>{title}</AlertTitle>

        <Typography variant='body2'>
            {'Please try again later. If problem persists, please '}
            <Link
                sx={styles.supportLink}
                href='mailto: support@dolittle.com'>
                contact support
            </Link>{'.'}
        </Typography>
    </Alert>
);
