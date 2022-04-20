// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { SxProps } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type Props = {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    disabled?: boolean
    children: React.ReactNode;
    withIcon?: boolean;
};

const defaultOnClick = (event: React.MouseEvent<HTMLElement>) => { };

const styles = {
    base: {
        textTransform: 'uppercase',
        padding: '8px 12px',
        marginTop: 1,
        marginRight: 1,
        color: '#2C2B33',
    } as SxProps,
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
    } as SxProps,
};

export const Button: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const children = _props.children;
    const onClick = _props.onClick ?? defaultOnClick;
    const disabled = _props.disabled ?? false;
    const buttonTypeClassName = styles.primary;
    const startIcon = _props.withIcon ? <AddIcon /> : null;

    return (
        <MuiButton
            sx={{ ...styles.base, ...buttonTypeClassName } as SxProps}
            disabled={disabled}
            startIcon={startIcon}
            onClick={onClick}
        >
            {children}
        </MuiButton>
    );
};
