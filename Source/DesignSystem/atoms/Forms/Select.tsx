// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { MenuItem, TextField, TextFieldProps } from '@mui/material';

const runtimeVersions = [
    {
        value: '8.6.0'
    },
    {
        value: '6.1.0'
    },
    {
        value: 'None'
    }
];

export const Select = (props: TextFieldProps) => {
    const [selectedValue, setSelectedValue] = useState('8.6.0');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <TextField
            id={props.id}
            select
            label={props.label}
            value={selectedValue}
            onChange={handleChange}
        >
            {runtimeVersions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.value}
                </MenuItem>
            ))}
        </TextField>
    );
};
