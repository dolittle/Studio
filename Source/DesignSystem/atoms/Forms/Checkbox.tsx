// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { FormControl, FormControlLabel, FormHelperText, Checkbox as MuiCheckbox, Typography } from '@mui/material';

import { isRequired, useController, FieldProps } from './helpers';
import type { Form } from './Form';

/**
 * Creates a checkbox field to be used in a {@link Form}.
 * @param props - The {@link FieldProps} for the checkbox.
 * @returns A {@link Checkbox} component.
 */
export const Checkbox = (props: FieldProps) => {
    const { field, hasError, errorMessage } = useController(props);

    return (
        <FormControl error={hasError} required={isRequired(props.required)} sx={{ display: 'inline' }}>
            <FormControlLabel
                control={<MuiCheckbox {...field} id={`${props.id}-checkbox`} checked={!!field.value} disabled={props.disabled} sx={{ mr: 0.5 }} />}
                label={props.label}
                sx={{ mr: 0 }}
            />
            <FormHelperText error={hasError} id={`${props.id}-checkbox-helper-text`}>
                <Typography variant='caption' sx={{ color: 'error.light' }}>{errorMessage}</Typography>
            </FormHelperText>
        </FormControl>
    );
};
