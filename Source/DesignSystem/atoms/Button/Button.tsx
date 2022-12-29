// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { MouseEventHandler, ReactElement } from 'react';

import { Button as MuiButton, SvgIconProps, SxProps } from '@mui/material';

export type ButtonProps = {
    /**
     * Required - button must contain text.
     */
    label: string;

    /**
     * Optional. The variant of the button.
     * @default 'text'
     */
    variant?: 'filled' | 'text' | 'outlined';

    /**
     * Optional. Whether the button is disabled or not.
     * @default false
     */
    disabled?: boolean;

    /**
     * Optional. The color of the button.
     * @default 'primary'
     */
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

    /**
     * Optional. The size of the button.
     * Small is same size as medium as it is overridden in the Theme.
     * @default 'small'
     */
    size?: 'small' | 'medium' | 'large';

    /**
     * Optional. Whether the button should take up the full width of its container.
     * @default false
     */
    isFullWidth?: boolean;

    /**
     * An optional icon to start with. Supports only React svg icons.
     * @default undefined
     */
    startWithIcon?: ReactElement<SvgIconProps>;

    /**
     * An optional icon to end with. Supports only React svg icons.
     * @default undefined
     */
    endWithIcon?: ReactElement<SvgIconProps>;

    /**
     * Optional. The type of the button.
     * @default 'button'
     */
    type?: 'button' | 'submit' | 'reset';
    onClick?: MouseEventHandler<HTMLButtonElement>;

    /**
     * Optional. The sx prop for the button.
     * @default undefined
     */
    sx?: SxProps;
};

/**
 * A button component. Children is not a valid prop.
 * @param {...ButtonProps} props - The {@link ButtonProps}.
 * @returns {ReactElement} A new {@link Button} component.
 * @example
 * <Button label='Click me' disabled />
 * <Button label='Click me' variant='filled' isFullWidth startWithIcon={<AddCircle />} />
 * <Button label='Click me' type='submit' />
 */
export const Button = ({ variant, label, disabled, color, size, isFullWidth, startWithIcon, endWithIcon, type, onClick, sx }: ButtonProps): ReactElement =>
    <MuiButton
        variant={variant === 'filled' ? 'contained' : variant || 'text'}
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
