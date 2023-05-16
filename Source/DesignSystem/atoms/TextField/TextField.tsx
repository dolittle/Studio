// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { InputAdornment, SxProps, TextField as MuiTextField } from '@mui/material';

import { Icon } from '../Icon';

const SearchFieldAdornment = () =>
    <InputAdornment position='start'>
        <Icon icon='Search' size='medium' />
    </InputAdornment>;

export type TextFieldProps = {
    /**
     * The id of the `input` element.
     */
    id?: string;

    /**
     * The label content.
     */
    label?: string;

    /**
     * The value of the `input` element.
     */
    value?: HTMLInputElement;

    onValueChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

    /**
     * Name attribute of the `input` element.
     */
    name?: string;

    /**
     * The help text content displayed under the `input`.
     */
    helpText?: React.ReactNode;

    /**
     * 'compact' displays the label _in_ the border when input is active
     */
    size?: 'default' | 'compact';

    placeholder?: string;
    isFullWidth?: boolean;

    /**
     * If `true`, the `input` element will be disabled.
     * @default false
     */
    disabled?: boolean;

    autoFocus?: boolean;

    /**
     * Override or extend the styles applied to the component.
     */
    sx?: SxProps;
};

export const TextField = ({ id, label, value, onValueChange, placeholder, isFullWidth, sx }: TextFieldProps) =>
    <MuiTextField
        id={id}
        label={label}
        value={value}
        placeholder={placeholder}
        fullWidth={isFullWidth}
        InputProps={{
            startAdornment: <SearchFieldAdornment />,
            endAdornment: <SearchFieldAdornment />,
        }}
        onChange={onValueChange}
        size='small'
        type='text'
        variant='outlined'
        autoComplete='off'
        sx={sx}
    />;
