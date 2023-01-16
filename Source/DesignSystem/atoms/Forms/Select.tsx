// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { FormControl, MenuItem, TextField, SxProps } from '@mui/material';

import { Tooltip } from '@dolittle/design-system';

import { useController, FieldProps } from './helpers';

/**
 * The props for a {@link Select} component.
 */
export type SelectProps = {
    options: { value: string }[];
    tooltipTitle?: string;
    tooltipText?: string;
    sx?: SxProps;
} & FieldProps;

export const Select = (props: SelectProps) => {
    const { field } = useController(props);

    return (
        <FormControl sx={{ width: 220, ...props.sx }}>
            <Tooltip
                id={`${props.id}-tooltip`}
                tooltipTitle={props.tooltipTitle}
                tooltipText={props.tooltipText}
            >
                <TextField
                    {...field}
                    select
                    label={props.label}
                    value={field.value}
                    disabled={props.disabled}
                    size='small'
                    fullWidth
                >
                    {props.options.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.value}
                        </MenuItem>
                    ))}
                </TextField>
            </Tooltip>
        </FormControl>
    );
};
