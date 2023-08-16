// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { forwardRef } from 'react';

import { FormControl, InputLabel, MenuItem, Select as MuiSelect, SelectProps as MuiSelectProps, SxProps } from '@mui/material';

import { useController, isRequired, FieldProps } from './helpers';

export type SelectPropsOptions<T = string> = { value: T, displayValue: string }[];

/**
 * The props for a {@link Select} component.
 */
export type SelectProps<T = string> = {
    /**
     * The options to display in the select.
     */
    options: SelectPropsOptions;

    /**
     * An optional callback to call when the select is opened.
     */
    onOpen?: () => void;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;
} & FieldProps;

/**
 * Creates an select input field to be used in a {@link Form}.
 * @param {SelectProps} props - The {@link SelectProps}.
 * @returns A {@link Select} component.
 */
export const Select = forwardRef<HTMLOptionElement, SelectProps>(({ options, onOpen, sx, ...selectProps }, ref) => {
    const { field } = useController(selectProps);

    /**
     * Override the default validation mode of the field.
     * Select should validate on every 'onChange'. Rest of form defaults to 'onTouched'. Set in {@link Form}.
     * 'onTouched' behaviour is onBlur for first validation, then onChange for subsequent validations.
     * Great for input fields, less great for selects
     * More Info: https://www.react-hook-form.com/api/useform/#mode
     * @param e the event triggered
     */
    const overrideDefaultValidationMode = (e) => {
        field.onChange(e);
        field.onBlur();
    };
    return (
        <FormControl size='small' sx={{ width: 220, ...sx }}>
            <InputLabel
                id={`${selectProps.id}-select`}
                disabled={selectProps.disabled}
                required={isRequired(selectProps.required)}
                size='small'
                sx={{ typography: 'body2' }}
            >
                {selectProps.label}
            </InputLabel>

            <MuiSelect
                {...selectProps}
                {...field}
                onChange={overrideDefaultValidationMode}
                required={isRequired(selectProps.required)}
                ref={ref}
                labelId={`${selectProps.id}-select`}
                onOpen={onOpen}
                value={field.value}
                disabled={selectProps.disabled}
                size='small'
                sx={{ typography: 'body2' }}
                autoWidth
                MenuProps={{
                    anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
                    transformOrigin: { vertical: 'top', horizontal: 'right' }
                }}
            >
                {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.displayValue}
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    );
});

Select.displayName = 'Select';
