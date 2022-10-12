// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Alert, AlertTitle, Link, Typography } from '@mui/material';

const styles = {
    alert: {
        display: 'inline-flex',
        textAlign: 'left'
    },
    inlineMessage: {
        display: 'inline-flex'
    }
};

type LinkTypes = {
    href: string;
    text: string;
};

export type AlertBoxProps = {
    title: string;
    severity: 'error' | 'warning' | 'info' | 'success';
    message?: any;
    link?: LinkTypes;
    sx?: any;
};

const spaceChar = '\u2002';
const periodChar = '.';

const messageLink = (link: { href: string; text: string }) =>
    <Typography sx={styles.inlineMessage} variant='body2'>
        {spaceChar}
        <Link href={link.href}>{link.text}</Link>
        {periodChar}
    </Typography>;

export const AlertBox = (props: AlertBoxProps) =>
    <Alert
        sx={{
            ...styles.alert,
            borderColor: props.severity === 'error' ? 'error.dark' : null,
            ...props.sx
        }}
        variant="outlined"
        severity={props.severity}>

        <AlertTitle>{props.title}</AlertTitle>

        <Typography sx={styles.inlineMessage} variant='body2'>
            {props.message}
        </Typography>

        {props.link ? messageLink(props.link) : null}
    </Alert>;
