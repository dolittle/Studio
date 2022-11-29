// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { forwardRef } from 'react';

import clsx from 'clsx';
import { CustomContentProps, SnackbarContent } from 'notistack';

import { Box } from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: '#323232',
        fontWeight: 400,
        fontSize: '0.875rem',
        lineHeight: 1.43,
        letterSpacing: '0.01071em',
        color: '#FFFFFF',
        alignItems: 'center',
        padding: '6px 16px',
        borderRadius: '4px',
        boxShadow:
            '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)'
    },
    error: {
        backgroundColor: '#C55252'
    }
}));

export const Snackbar = forwardRef<HTMLDivElement, CustomContentProps>((props, forwardedRef) => {
    const classes = useStyles();

    return (
        <SnackbarContent
            ref={forwardedRef}
            className={clsx(classes.root, classes[props.variant])}
        >
            {props.iconVariant[props.variant]}

            <Box sx={{ py: 1 }}>{props.message}</Box>
        </SnackbarContent>
    );
});
