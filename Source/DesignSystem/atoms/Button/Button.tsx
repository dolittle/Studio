// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { MouseEventHandler, ReactElement } from 'react';

import { Button as MuiButton, SvgIconProps, SxProps } from '@mui/material';

export type ButtonProps = {
    variant: 'filled' | 'text' | 'outlined';
    label: string;
    disabled?: boolean;
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    size?: 'small' | 'medium' | 'large';
    isFullWidth?: boolean;
    startWithIcon?: ReactElement<SvgIconProps>;
    endWithIcon?: ReactElement<SvgIconProps>;
    type?: 'button' | 'submit' | 'reset';
    onClick?: MouseEventHandler<HTMLButtonElement>;
    sx?: SxProps;
};

export const Button = ({ variant, label, disabled, color, size, isFullWidth, startWithIcon, endWithIcon, type, onClick, sx }: ButtonProps) =>
    <MuiButton
        variant={variant === 'filled' ? 'contained' : variant}
        disabled={disabled}
        color={color}
        size={size ?? 'small'}
        fullWidth={isFullWidth}
        startIcon={startWithIcon}
        endIcon={endWithIcon}
        type={type ?? 'button'}
        onClick={onClick}
        sx={sx}
        disableElevation
        disableRipple
    >
        {label}
    </MuiButton>;
