// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import clsx from 'clsx';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button as MuiButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

type Props = {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    buttonType?: 'primary' | 'secondary'
    disabled?: boolean
    children: React.ReactNode;
    withIcon?: boolean;
    // If startIcon is added, it will override withIcon
    startIcon?: React.ReactNode;
};

const defaultOnClick = (event: React.MouseEvent<HTMLElement>) => { };

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        base: {
            textTransform: 'uppercase',
            padding: '8px 12px',
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
            backgroundColor: 'transparent'
        },
        secondary: {
            'color': '#FAFAFA',
            'backgroundColor': 'transparent',
            '&:hover': {
                color: '#B3BBFB',
                backgroundColor: 'transparent'
            },
            '&:disabled': {
                color: '#93959F',
                backgroundColor: 'transparent'
            },
            '&:active': {
                color: '#8C9AF8',
                backgroundColor: 'transparent'
            },
            '&:focus': {
                color: '#8C9AF8',
                backgroundColor: 'transparent'
            }

        },
        primary: {
            'color': '#6678F6',
            '&:hover': {
                color: '#B3BBFB',
                backgroundColor: 'transparent'
            },
            '&:disabled': {
                color: '#93959F',
                backgroundColor: 'transparent'
            },
            '&:active': {
                color: '#8C9AF8',
                backgroundColor: 'transparent'
            },
            '&:focus': {
                color: '#8C9AF8',
                backgroundColor: 'transparent'
            }
        },
    })
);

export const ButtonText: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles();
    const _props = props!;
    const children = _props.children;
    const onClick = _props.onClick ?? defaultOnClick;
    const disabled = _props.disabled ?? false;
    const buttonType = _props.buttonType ?? 'primary';
    const buttonTypeClassName = classes[buttonType];

    let startIcon: React.ReactNode = _props.withIcon ? <AddIcon /> : null;
    startIcon = _props.startIcon ?? startIcon;

    return (
        <MuiButton
            disableRipple={true}
            disabled={disabled}
            startIcon={startIcon}
            onClick={onClick}
            className={clsx(classes.base, buttonTypeClassName)}
        >
            {children}
        </MuiButton>
    );
};
