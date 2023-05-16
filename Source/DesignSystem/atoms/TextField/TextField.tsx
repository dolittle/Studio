// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { InputAdornment, SxProps, TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';

import { Icon, IconProps, SvgIconsDefinition } from '@dolittle/design-system';

export type TextFieldAdornmentProps = IconProps & {
    /**
     * The position this adornment should appear relative to the `text field` element.
     * @default start
     */
    position?: 'start' | 'end';
};

const TextFieldAdornment = ({ icon, color, size, position }: TextFieldAdornmentProps) =>
    <InputAdornment position={position ?? 'start'}>
        <Icon icon={icon} color={color ?? 'inherit'} size={size ?? 'medium'} />
    </InputAdornment>;

export type TextFieldProps = {
    /**
     * The id of the `text field` element.
     */
    id?: string;

    /**
     * The label content displayed above the `text field`.
     */
    label?: string;

    /**
     * The value of the `text field` element.
     */
    value?: HTMLInputElement;

    /**
     * The size of the `text field`.
     * @default small
     */
    size?: 'small' | 'medium';

    /**
     * The short hint displayed in the `text field` before the user enters a value.
     * @default ''
     */
    placeholder?: string;

    /**
     * The helper text content displayed under the `text field`.
     * @default undefined
     */
    helperText?: React.ReactNode;

    /**
     * If `true`, the `text field` element will be disabled.
     * @default false
     */
    isDisabled?: boolean;

    /**
     * If `true`, the `text field` element will take up the full width of its container.
     * @default false
     */
    isFullWidth?: boolean;

    /**
     * If `true`, the `text field` element will be focused.
     * @default false
     */
    autoFocus?: boolean;

    /**
     * The icon to display at the start of the `text field`. Must be a valid `SvgIconsDefinition`.
     * @default undefined
     */
    startIcon?: SvgIconsDefinition;

    /**
     * The icon to display at the end of the `text field`. Must be a valid `SvgIconsDefinition`.
     * @default undefined
     */
    endIcon?: SvgIconsDefinition;

    /**
     * The color of the icon.
     * @default inherit
     */
    iconColor?: IconProps['color'];

    /**
     * The size of the icon.
     * @default medium
     */
    iconSize?: IconProps['size'];

    /**
     * Callback fired when the value is changed.
     * @param {React.ChangeEvent} event - The event source of the callback.
     * @default undefined
     */
    onValueChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;
};

export const TextField = ({ id, label, value, size, placeholder, helperText, isDisabled, isFullWidth, startIcon, endIcon, iconColor, iconSize, onValueChange, sx }: TextFieldProps) =>
    <MuiTextField
        id={id}
        label={label}
        value={value}
        size={size ?? 'small'}
        placeholder={placeholder}
        helperText={helperText}
        disabled={isDisabled}
        fullWidth={isFullWidth}
        onChange={onValueChange}
        InputProps={{
            startAdornment: startIcon && <TextFieldAdornment icon={startIcon} color={iconColor} size={iconSize} />,
            endAdornment: endIcon && <TextFieldAdornment icon={endIcon} color={iconColor} size={iconSize} />,
        }}
        aria-describedby={`${id}-helper-text`}
        type='text'
        variant='outlined'
        autoComplete='off'
        sx={sx}
    />;
