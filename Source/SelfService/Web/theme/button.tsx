// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import clsx from 'clsx';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button as MuiButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { backgroundColor } from './viewCard';

type Props = {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    buttonType?: 'primary' | 'secondary' // TODO is this needed?
    disabled?: boolean
    children: React.ReactNode;
    withIcon?: boolean;
};

const defaultOnClick = (event: React.MouseEvent<HTMLElement>) => { };

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        base: {
            textTransform: 'uppercase',
            padding: '8px 12px',
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
            color: '#2C2B33',
        },
        primary: {
            'backgroundColor': '#6678F6',
            '&:hover': {
                backgroundColor: '#B3BBFB',
            },
            '&:disabled': {
                backgroundColor: '#93959F',
                color: '#3B3D48',
            },
            '&:focus': {
                backgroundColor: '#8C9AF8',
            },
        },
    })
);

export const Button: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles();
    const _props = props!;
    const children = _props.children;
    const onClick = _props.onClick ?? defaultOnClick;
    const disabled = _props.disabled ?? false;
    const buttonType = 'primary';
    const buttonTypeClassName = classes[buttonType];
    const startIcon = _props.withIcon ? <AddIcon /> : null;

    return (
        <MuiButton
            disabled={disabled}
            startIcon={startIcon}
            onClick={onClick}
            className={clsx(classes.base, buttonTypeClassName)}
        >
            {children}
        </MuiButton>
    );
};
