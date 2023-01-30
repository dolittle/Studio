// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { forwardRef } from 'react';

import { FormControl, InputLabel, MenuItem, Select as MuiSelect, SelectProps as MuiSelectProps, SxProps } from '@mui/material';

import { useController, isRequired, FieldProps } from './helpers';

/**
 * The props for a {@link Select} component.
 */
export type SelectProps<T = string> = {
    /**
     * Required. The options to display in the select.
     */
    options: { value: T, displayValue: string }[];

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
 * @param props The {@link SelectProps} for the input.
 * @returns A new {@link Select} component.
 * @example
 * <Form initialValues={{ select: '' }}>
 *    <Select name='select' label='Select' options={[{ value: '1', displayValue: 'One' }, { value: '2', displayValue: 'Two' }]} />
 * </Form>
 */
export const Select = forwardRef<HTMLOptionElement, SelectProps>(({ options, onOpen, sx, ...selectProps }, ref) => {
    const { field } = useController(selectProps);

    return (
        <FormControl size='small' sx={{ width: 220, ...sx }}>
            <InputLabel id={`${selectProps.label}-label`} required={isRequired(selectProps.required)}>
                {selectProps.label}
            </InputLabel>

            <MuiSelect
                {...field}
                {...selectProps as MuiSelectProps}
                ref={ref}
                labelId={`${selectProps.label}-label`}
                value={field.value}
                disabled={selectProps.disabled}
                onOpen={onOpen}
                size='small'
                autoWidth
                MenuProps={{
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right'
                    },
                    transformOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
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
