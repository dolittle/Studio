// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Alert, AlertTitle, Box, Link, SxProps, Typography } from '@mui/material';

import { IconButton } from '@dolittle/design-system/atoms/IconButton/IconButton';

type LinkContent = {
    linkText: string;
    linkHref: string;
};

export type AlertBoxProps = {
    severity: 'error' | 'warning' | 'info' | 'success';
    title: string;
    message?: string;
    endWithLink?: LinkContent;
    isDismissable?: boolean;
    onDismiss?: () => void;
    sx?: SxProps;
};

const spaceChar = '\u2002';
const periodChar = '.';

const MessageEndLink = ({ linkText, linkHref }: LinkContent) =>
    <Typography variant='body2'>
        {spaceChar}
        <Link href={linkHref}>{linkText}</Link>
        {periodChar}
    </Typography>;

export const AlertBox = (props: AlertBoxProps) =>
    <Alert
        variant='outlined'
        severity={props.severity}
        action={props.isDismissable && <IconButton onClick={props.onDismiss} />}
        sx={{
            'display': 'inline-flex',
            'textAlign': 'left',
            'position': 'relative',
            'borderColor': props.severity === 'error' ? 'error.dark' : null,
            '& .MuiAlert-action': {
                pt: 0
            },
            ...props.sx
        }}
    >
        <AlertTitle>{props.title}</AlertTitle>

        <Box sx={{ display: 'inline-flex' }}>
            <Typography variant='body2'>{props.message}</Typography>
            {props.endWithLink && <MessageEndLink {...props.endWithLink} />}
        </Box>
    </Alert>;
