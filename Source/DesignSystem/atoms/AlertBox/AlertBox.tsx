// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Alert, AlertTitle, Collapse, Link, SxProps, Typography } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';

import { Button } from '../Button/Button';

type LinkTypes = {
    href: string;
    text: string;
};

export type AlertBoxProps = {
    severity: 'error' | 'warning' | 'info' | 'success';
    title: string;
    message?: string;
    link?: LinkTypes;
    action?: React.ReactNode;
    actionText?: string;
    isOpen?: boolean;
    closeAction?: () => void;
    sx?: SxProps;
};

const spaceChar = '\u2002';
const periodChar = '.';

export const AlertBox = (props: AlertBoxProps) =>
    <Collapse in={props.isOpen}>
        <Alert
            variant='outlined'
            severity={props.severity}
            action={
                <Button
                    onClick={props.closeAction}
                    variant='text'
                    label={props.actionText || ''}
                    endWithIcon={<CloseOutlined />}
                    sx={{ color: 'inherit' }}
                />
            }
            sx={{
                'display': 'inline-flex',
                'textAlign': 'left',
                'position': 'relative',
                '& .MuiAlert-action': {
                    minWidth: 'fit-content',
                    justifyContent: 'flex-end'
                },
                'borderColor': props.severity === 'error' ? 'error.dark' : null,
                ...props.sx
            }}
        >

            <AlertTitle>{props.title}</AlertTitle>

            <Typography sx={{ display: 'inline-flex' }} variant='body2'>
                {props.message}
            </Typography>

            {props.link ?
                <Typography sx={{ display: 'inline-flex' }} variant='body2'>
                    {spaceChar}
                    <Link href={props.link.href}>{props.link.text}</Link>
                    {periodChar}
                </Typography> :
                null
            }
        </Alert>
    </Collapse>;
