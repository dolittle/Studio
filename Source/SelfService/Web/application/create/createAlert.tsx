// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { themeDark } from '../../theme/theme';
import { Alert, AlertTitle, Typography, Link } from '@mui/material';

const styles = {
    alertWrapper: {
        'marginBlockStart': '48px',
        'borderColor': themeDark.palette.error.dark,
        'textAlign': 'left',
        '& .MuiAlert-icon': {
            color: themeDark.palette.error.dark,
        }
    },
    supportLink: {
        color: themeDark.palette.primary.main,
        textDecoration: 'underline',
        cursor: 'pointer',
    }
};

export const CreateAlert: React.FunctionComponent = () => {
    const unicodeSpaceChar = '\u0020';
    const { alertWrapper, supportLink } = styles;

    return (
        <Alert sx={alertWrapper} variant="outlined" severity="error">
            <AlertTitle>Oops, something went wrong</AlertTitle>
            <Typography variant='body2'>
                Please try again later. If problem persists, please {unicodeSpaceChar}
                <Link
                    sx={supportLink}
                    href='mailto: support@dolittle.com'>
                    contact support
                </Link>.
            </Typography>
        </Alert>
    );
};
