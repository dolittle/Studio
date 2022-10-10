// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';

import { themeDark } from '@dolittle/design-system';

import { useController, FieldProps } from './helpers';
import type { Form } from './Form';

const styles = {
    formFieldsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        [themeDark.breakpoints.down('sm')]: {
            flexDirection: 'column',
            m: 0
        }
    },
    input: {
        'maxWidth': 220,
        '.MuiInputLabel-root[data-shrink="true"]': {
            top: 0
        },
        '.MuiFormHelperText-root.Mui-error': {
            color: 'error.light',
            letterSpacing: '0.4px'
        }
    },
    formField: {
        letterSpacing: '0.15px',
        [themeDark.breakpoints.down('sm')]: {
            mb: 2.5
        }
    },
};

/**
 * The props for a {@link Input} component.
 */
export type InputProps = {
} & FieldProps;

/**
 * Creates an text input field to be used in a {@link Form}.
 * @param props The {@link InputProps} for the input.
 * @returns A new {@link Input} component.
 */
export const Input = (props: InputProps) => {
    const { field, hasError, errorMessage } = useController(props);

    return (
        <FormControl sx={{ ...styles.formFieldsWrapper, ...styles.input }}>
            <InputLabel
                error={hasError}
                sx={{ top: -8 }}
                required={props.required !== undefined}
                htmlFor={props.id}
            >
                {props.label}
            </InputLabel>

            <OutlinedInput
                id={props.id}
                type='text'
                {...field}
                error={hasError}
                disabled={props.disabled}
                label={props.label}
                aria-describedby={`${props.id}-helper-text`}
                size='small'
                sx={styles.formField}
            />

            <FormHelperText error={hasError} id={`${props.id}-helper-text`}>
                {errorMessage}
            </FormHelperText>
        </FormControl>
    );
};
