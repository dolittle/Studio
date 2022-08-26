// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Button as MuiButton } from '@mui/material';

type ButtonProps = {
  variant: 'filled' | 'text' | 'outlined';
  disabled?: boolean;
  label: string;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  startWithIcon?: any;
  endWithIcon?: any;
  sx?: {};
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

export const Button = (props: ButtonProps) => {

  const _props = props!;
  const variant = _props.variant === 'filled' ? 'contained' : _props.variant ?? 'contained';
  const disabled = _props.disabled ?? false;
  const label = _props.label ?? 'Button';
  const color = _props.color ?? 'primary';
  const size = _props.size ?? 'small';
  const startWithIcon = _props.startWithIcon;
  const endWithIcon = _props.endWithIcon;
  const sx = _props.sx;

  return (
    <MuiButton
      variant={variant}
      disabled={disabled}
      color={color}
      size={size}
      startIcon={startWithIcon}
      endIcon={endWithIcon}
      sx={sx}
      disableElevation
    >
      {label}
    </MuiButton>
  );
};
