// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { InputAdornment, SxProps, TextField as MuiTextField } from '@mui/material';

import { Icon, IconProps, SvgIconsDefinition } from '@dolittle/design-system';

const TextFieldAdornment = ({ icon, color, size }: IconProps) =>
    <InputAdornment position='start'>
        <Icon icon={icon} color={color} size={size} />
    </InputAdornment>;

export type TextFieldProps = {
    /**
     * The label content displayed above the `TextField`.
     */
    label?: string;

    /**
     * The value of the `TextField` element, required for a controlled component.
     */
    value?: string | HTMLInputElement;

    /**
     * The size of the `TextField`.
     * @default small
     */
    size?: 'small' | 'medium';

    /**
     * The short hint displayed in the `TextField` before the user enters a value.
     */
    placeholder?: string;

    /**
     * The helper text content displayed under the `TextField`.
     */
    helperText?: string;

    /**
     * If true, the `TextField` element will be disabled.
     * @default false
     */
    isDisabled?: boolean;

    /**
     * If true, the `TextField` element will take up the full width of its container.
     * @default false
     */
    isFullWidth?: boolean;

    /**
     * The icon to display at the start of the `TextField`. Must be a valid `SvgIconsDefinition`.
     * @default undefined
     */
    startIcon?: SvgIconsDefinition;

    /**
     * The color of the `startIcon`.
     * @default inherit
     */
    iconColor?: IconProps['color'];

    /**
     * Callback fired when the `value` is changed.
     * @param {React.ChangeEvent} event - The event source of the callback.
     * @default undefined
     */
    onValueChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;
};

export const TextField = ({ label, value, size = 'small', placeholder, helperText, isDisabled, isFullWidth, startIcon, iconColor, onValueChange, sx }: TextFieldProps) =>
    <MuiTextField
        label={label}
        value={value}
        size={size}
        placeholder={placeholder}
        helperText={helperText}
        disabled={isDisabled}
        fullWidth={isFullWidth}
        InputProps={{
            startAdornment: startIcon &&
                <TextFieldAdornment icon={startIcon} color={iconColor ?? 'inherit'} size={size} />
        }}
        onChange={onValueChange}
        variant='outlined'
        type='text'
        autoComplete='off'
        sx={sx}
    />;
