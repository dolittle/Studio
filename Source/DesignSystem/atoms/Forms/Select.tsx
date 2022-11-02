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

export const Select = (props: SelectProps) =>
    <TextField
        id={props.id}
        select
        value={props.value}
        label={props.label}
        disabled={props.disabled}
        onChange={props.onChange}
        variant="outlined"
        size='small'
        sx={props.sx}
    >
        {props.options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.value}
            </MenuItem>
        ))}
    </TextField>;
