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
    link?: React.ElementType;
    sx?: SxProps;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const IconButton = (props: IconButtonProps) =>
    <MuiIconButton
        disabled={props.disabled}
        color={props.color || 'inherit'}
        size={props.size || 'small'}
        LinkComponent={props.link}
        sx={props.sx}
        onClick={props.onClick}
    >
        {props.icon || <CloseRounded aria-label='close' />}
    </MuiIconButton>;
