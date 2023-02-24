// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';

import { useController, FieldProps } from './helpers';
import type { Form } from './Form';

/**
 * Creates a checkbox field to be used in a {@link Form}.
 * @param props - The {@link FieldProps} for the checkbox.
 * @returns A {@link Checkbox} component.
 */
export const Checkbox = (props: FieldProps) => {
    const { field } = useController(props);

    return (
        <FormControl>
            <FormControlLabel
                control={
                    <MuiCheckbox {...field} checked={!!field.value} disabled={props.disabled} sx={{ mr: 0.5 }} />
                }
                label={props.label}
                sx={{ mr: 0 }}
            />
        </FormControl>
    );
};
