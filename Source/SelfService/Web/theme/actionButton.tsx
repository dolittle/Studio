// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

type Props = {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    buttonType: 'primary' | 'secondary'
    disabled: boolean
    children: React.ReactNode;
};

const defaultOnClick = (event: React.MouseEvent<HTMLElement>) => { };

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        secondary: {
            'textTransform': 'uppercase',
            'marginTop': theme.spacing(1),
            'marginRight': theme.spacing(1),
            'color': '#E9EAEC',
            'backgroundColor': 'inherit',
            '&:disabled': {
                backgroundColor: 'inherit',
                color: '#3B3D48',
            },
            '&:hover': {
                color: '#3B3D48',
                backgroundColor: 'inherit',
            },
        },
        primary: {
            'marginTop': theme.spacing(1),
            'marginRight': theme.spacing(1),
            'color': '#2C2B33',
            'backgroundColor': '#6678F6',
            '&:hover': {
                color: '#2C2B33',
                backgroundColor: '#6678F6',
            },
            '&:disabled': {
                backgroundColor: '#93959F',
                color: '#3B3D48',
            }
        },
    })
);


export const ActionButton: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles();
    const _props = props!;
    const children = _props.children;
    const onClick = _props.onClick ?? defaultOnClick;
    const disabled = _props.disabled;
    const className = classes[_props.buttonType];
    return (
        <Button
            variant='contained'
            disabled={disabled}
            onClick={onClick}
            className={className}
        >
            {children}
        </Button>

    );
};
