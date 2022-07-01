// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { SxProps } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';
import { themeDark } from './theme';
import AddCircleIcon from '@mui/icons-material/AddCircle';

type Props = {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    buttonType?: 'primary' | 'secondary'
    disabled?: boolean
    children: React.ReactNode;
    withIcon?: boolean;
    // If startIcon is added, it will override withIcon
    startIcon?: React.ReactNode;
    className?: any;
    size?: 'small' | 'medium' | 'large';
    sx?: SxProps;
};

const defaultOnClick = (event: React.MouseEvent<HTMLElement>) => { };

const styles = {
    base: {
        textTransform: 'uppercase',
        padding: '8px 12px',
        backgroundColor: 'transparent',
    } as SxProps,
    secondary: {
        'color': themeDark.palette.text.primary,
        'backgroundColor': 'transparent',
        '&:hover': {
            color: themeDark.palette.primary.light,
            backgroundColor: 'transparent'
        },
        '&:active': {
            color: themeDark.palette.primary.main,
            backgroundColor: 'transparent'
        },
        '&:focus': {
            color: themeDark.palette.primary.main,
            backgroundColor: 'transparent'
        },
        '&:disabled': {
            color: themeDark.palette.text.disabled,
            backgroundColor: 'transparent'
        },

    } as SxProps,
    primary: {
        'color': themeDark.palette.primary.main,
        '&:hover': {
            color: themeDark.palette.primary.light,
            backgroundColor: 'transparent'
        },
        '&:active': {
            color: themeDark.palette.primary.main,
            backgroundColor: 'transparent'
        },
        '&:focus': {
            color: themeDark.palette.primary.main,
            backgroundColor: 'transparent'
        },
        '&:disabled': {
            color: themeDark.palette.text.disabled,
            backgroundColor: 'transparent'
        },
    } as SxProps,
};

export const ButtonText = (props: Props) => {
    const _props = props!;
    const children = _props.children;
    const onClick = _props.onClick ?? defaultOnClick;
    const disabled = _props.disabled ?? false;
    const buttonType = _props.buttonType ?? 'primary';
    const buttonTypeStyles = styles[buttonType];
    const buttonSize = _props.size ?? 'medium';

    let startIcon: React.ReactNode = _props.withIcon ? <AddCircleIcon /> : null;
    startIcon = _props.startIcon ?? startIcon;

    return (
        <MuiButton
            sx={{ ...styles.base, ...buttonTypeStyles, ...props.sx } as SxProps}
            disableRipple={true}
            disabled={disabled}
            startIcon={startIcon}
            onClick={onClick}
            size={buttonSize}
        >
            {children}
        </MuiButton>
    );
};
