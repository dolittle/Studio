// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { forwardRef } from 'react';

import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInputProps, OutlinedInput, SxProps, Typography } from '@mui/material';

import { FieldProps, isRequired, useController } from './helpers';
import type { Form } from './Form';

/**
 * The props for a {@link Input} component.
 */
export type InputProps = {
    autoFocus?: boolean;
    startAdornment?: React.ReactNode;
    placeholder?: string;
    sx?: SxProps;
} & FieldProps;

/**
 * Creates an text input field to be used in a {@link Form}.
 * @param props The {@link InputProps} for the input.
 * @returns A new {@link Input} component.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({ autoFocus, startAdornment, placeholder, sx, ...fieldProps }, ref) => {
    const { field, hasError, errorMessage } = useController(fieldProps);

    return (
        <FormControl
            variant='outlined'
            size='small'
            sx={{
                width: 220,
                mb: { sm: 0, xs: 2.5 },
                ...sx
            }}>
            <InputLabel
                htmlFor={fieldProps.id}
                required={isRequired(fieldProps.required)}
                disabled={fieldProps.disabled}
                error={hasError}
            >
                {fieldProps.label}
            </InputLabel>

            <OutlinedInput
                {...fieldProps as OutlinedInputProps}
                {...field}
                ref={ref}
                id={fieldProps.id}
                type='text'
                autoFocus={autoFocus}
                error={hasError}
                disabled={fieldProps.disabled}
                label={fieldProps.label}
                startAdornment={startAdornment ?
                    <InputAdornment position='start'>
                        <Typography variant='body2'>{startAdornment}</Typography>
                    </InputAdornment> : null
                }
                placeholder={placeholder}
                aria-describedby={`${fieldProps.id}-helper-text`}
                inputProps={{
                    'autoComplete': 'off',
                    'data-lpignore': true,
                    'data-form-type': 'other'
                }}
            />

            <FormHelperText error={hasError} id={`${fieldProps.id}-helper-text`}>
                {errorMessage}
            </FormHelperText>
        </FormControl>
    );
});

Input.displayName = 'Input';
