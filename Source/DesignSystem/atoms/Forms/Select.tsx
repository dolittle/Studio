// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { MenuItem, TextField, TextFieldProps } from '@mui/material';

/**
 * The props for a {@link Select} component.
 */
export type SelectProps = {
    options: any;
} & TextFieldProps;

export const Select = (props: SelectProps) => {
    const [selectedValue, setSelectedValue] = useState(props.value ?? '');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <TextField
            id={props.id}
            select
            label={props.label}
            value={selectedValue}
            size='small'
            onChange={handleChange}
            sx={props.sx}
            disabled={props.disabled}
        >
            {props.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.value}
                </MenuItem>
            ))}
        </TextField>
    );
};
