// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';

import { useController, FieldProps } from './helpers';
import type { Form } from './Form';

/**
 * The props for a {@link Checkbox} component.
 */
export type CheckboxProps = {
} & FieldProps;

/**
 * Creates a checkbox field to be used in a {@link Form}.
 * @param props The {@link CheckboxProps} for the checkbox.
 * @returns A new {@link Checkbox} component.
 */
export const Checkbox = (props: CheckboxProps) => {
    const { field } = useController(props);

    return (
        <FormControl sx={{ mr: 0 }}>
            <FormControlLabel
                control={
                    <MuiCheckbox {...field} checked={!!field.value} disabled={props.disabled} />
                }
                label={props.label}
            />
        </FormControl>
    );
};
