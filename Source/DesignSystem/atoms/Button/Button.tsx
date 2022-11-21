// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { MouseEventHandler, ReactElement } from 'react';

import { Button as MuiButton, SvgIconProps, SxProps } from '@mui/material';

type ButtonProps = {
    variant: 'filled' | 'text' | 'outlined';
    disabled?: boolean;
    label: string;
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    size?: 'small' | 'medium' | 'large';
    startWithIcon?: ReactElement<SvgIconProps>;
    endWithIcon?: ReactElement<SvgIconProps>;
    type?: 'button' | 'submit' | 'reset';
    sx?: SxProps;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button = (props: ButtonProps) =>
    <MuiButton
        variant={props.variant === 'filled' ? 'contained' : props.variant}
        disabled={props.disabled}
        color={props.color}
        size={props.size ?? 'small'}
        startIcon={props.startWithIcon}
        endIcon={props.endWithIcon}
        type={props.type ?? 'button'}
        sx={props.sx}
        onClick={props.onClick}
        disableElevation
    >
        {props.label}
    </MuiButton>;
