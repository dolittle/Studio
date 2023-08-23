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
    /**
     * Whether the input should be focused on mount.
     * @default false
     */
    autoFocus?: boolean;

    /**
     * The start adornment for the input.
     * @default undefined
     */
    startAdornment?: React.ReactNode;

    /**
     * The placeholder for the input.
     * @default undefined
     */
    placeholder?: string;

    /**
     * Whether the input should have a dashed border.
     * @default false
     */
    dashedBorder?: boolean;

    /**
     * The type of the input.
     * @default 'text'
     */
    type?: string;

    /**
     * If true, the `Input` element will take up the full width of its container.
     * @default false
     */
        isFullWidth?: boolean;

    /**
     * Whether the input should be multiline.
     * @default 'undefined'
     */
    multiline?: boolean;

    /**
     * The number of rows to limit the multiline input. Required {@link multiline} to be set .
     * @default 'undefined'
     */
    rows?: number;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;
} & FieldProps;

/**
 * Creates an text input field to be used in a {@link Form}.
 * @param props - The {@link InputProps} for the input.
 * @returns A {@link Input} component.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({ autoFocus, startAdornment, placeholder, dashedBorder, type, isFullWidth, multiline, rows, sx, ...fieldProps }, ref) => {
    const { field, hasError, errorMessage } = useController(fieldProps);

    return (
        <FormControl
            variant='outlined'
            size='small'
            sx={{
                'width': isFullWidth ? undefined :  220,
                'mb': { sm: 0, xs: 2.5 },
                '& fieldset': { borderStyle: dashedBorder ? 'dashed' : 'solid' },
                ...sx,
            }}
            fullWidth={isFullWidth}
            >
            <InputLabel
                htmlFor={fieldProps.id}
                required={isRequired(fieldProps.required)}
                disabled={fieldProps.disabled}
                error={hasError}
                sx={{ display: 'flex' }}
            >
                <Typography variant='body2'>{fieldProps.label}</Typography>
            </InputLabel>

            <OutlinedInput
                {...fieldProps as OutlinedInputProps}
                {...field}
                ref={ref}
                id={fieldProps.id}
                autoFocus={autoFocus}
                error={hasError}
                disabled={fieldProps.disabled}
                label={fieldProps.label}
                required={isRequired(fieldProps.required)}
                placeholder={placeholder}
                aria-describedby={`${fieldProps.id}-helper-text`}
                type={type ?? 'text'}
                size='small'
                multiline={multiline}
                rows={rows}
                sx={{ typography: 'body2' }}
                startAdornment={startAdornment ?
                    <InputAdornment position='start'>
                        <Typography variant='body2' sx={{ display: 'flex', color: 'action.active' }}>{startAdornment}</Typography>
                    </InputAdornment> : null
                }
                inputProps={{
                    'autoComplete': 'off',
                    'data-lpignore': true,
                    'data-form-type': 'other'
                }}
            />
            <FormHelperText error={hasError} id={`${fieldProps.id}-helper-text`}>
                <Typography variant='caption' sx={{ color: 'error.light' }}>{errorMessage}</Typography>
            </FormHelperText>
        </FormControl>
    );
});

Input.displayName = 'Input';
