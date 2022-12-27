// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { MenuItem, TextField, TextFieldProps } from '@mui/material';

/**
 * The props for a {@link Select} component.
 */
export type SelectProps = {
    options: { value: string }[];
} & TextFieldProps;

export const Select = ({ options, id, value, label, disabled, onChange, sx }: SelectProps) =>
    <TextField
        select
        id={id}
        value={value}
        label={label}
        disabled={disabled}
        onChange={onChange}
        variant='outlined'
        size='small'
        sx={sx}
    >
        {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
                {option.value}
            </MenuItem>
        ))}
    </TextField>;
