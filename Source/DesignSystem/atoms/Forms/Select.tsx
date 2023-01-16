// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { forwardRef } from 'react';

import { FormControl, MenuItem, TextField, TextFieldProps, SxProps } from '@mui/material';

import { useController, FieldProps } from './helpers';

/**
 * The props for a {@link Select} component.
 */
export type SelectProps = {
    options: { value: string }[];
    sx?: SxProps;
} & FieldProps;

/**
 * Creates an select input field to be used in a {@link Form}.
 * @param props The {@link SelectProps} for the input.
 * @returns A new {@link Select} component.
 */
export const Select = forwardRef<HTMLInputElement, SelectProps>(({ options, sx, ...selectProps }, ref) => {
    const { field } = useController(selectProps);

    return (
        <FormControl sx={{ width: 220, ...sx }}>
            <TextField
                {...field}
                {...selectProps as TextFieldProps}
                ref={ref}
                select
                label={selectProps.label}
                value={field.value}
                disabled={selectProps.disabled}
                size='small'
                fullWidth
            >
                {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.value}
                    </MenuItem>
                ))}
            </TextField>
        </FormControl>
    );
});

Select.displayName = 'Select';
