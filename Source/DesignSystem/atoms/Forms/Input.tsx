// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput, SxProps, Typography } from '@mui/material';

import { FieldProps, isRequired, useController } from './helpers';
import type { Form } from './Form';

/**
 * The props for a {@link Input} component.
 */
export type InputProps = {
    sx?: SxProps;
    startAdornment?: React.ReactNode;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
} & FieldProps;

/**
 * Creates an text input field to be used in a {@link Form}.
 * @param props The {@link InputProps} for the input.
 * @returns A new {@link Input} component.
 */
export const Input = (props: InputProps) => {
    const { field, hasError, errorMessage } = useController(props);

    return (
        <FormControl
            variant='outlined'
            sx={{
                'width': 220,
                'mb': {
                    sm: 0,
                    xs: 2.5
                },
                'label': {
                    letterSpacing: '0.15px',
                    fontSize: 14,
                    lineHeight: '24px'
                },
                '.MuiInputLabel-root[data-shrink="true"]': {
                    top: 0
                },
                '.MuiFormHelperText-root.Mui-error': {
                    color: 'error.light',
                    letterSpacing: '0.4px'
                },
                '& ::placeholder': {
                    color: 'text.secondary',
                    fontSize: 14
                },
                ...props.sx
            }}>
            <InputLabel
                htmlFor={props.id}
                required={isRequired(props.required)}
                disabled={props.disabled}
                error={hasError}
                sx={{ top: -8 }}
            >
                {props.label}
            </InputLabel>

            <OutlinedInput
                {...field}
                type='text'
                id={props.id}
                error={hasError}
                disabled={props.disabled}
                startAdornment={props.startAdornment ?
                    <InputAdornment position='start' sx={{ color: 'action.active' }}>
                        <Typography variant='body2'>{props.startAdornment}</Typography>
                    </InputAdornment> : null
                }
                placeholder={props.placeholder}
                aria-describedby={`${props.id}-helper-text`}
                size='small'
            />

            <FormHelperText error={hasError} id={`${props.id}-helper-text`}>
                {errorMessage}
            </FormHelperText>
        </FormControl>
    );
};
