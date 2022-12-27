// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { MouseEventHandler, ReactElement } from 'react';

import { SvgIconProps, SxProps, IconButton as MuiIconButton } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

type IconButtonProps = {
    icon?: ReactElement<SvgIconProps>;
    disabled?: boolean;
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
    size?: 'small' | 'medium' | 'large';
    sx?: SxProps;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const IconButton = ({ disabled, color, size, sx, onClick, icon }: IconButtonProps) =>
    <MuiIconButton
        disabled={disabled}
        color={color || 'inherit'}
        size={size || 'small'}
        sx={sx}
        onClick={onClick}
    >
        {icon || <CloseRounded aria-label='close' fontSize={size || 'small'} />}
    </MuiIconButton>;
