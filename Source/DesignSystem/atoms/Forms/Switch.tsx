// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { FormControl, FormControlLabel, Switch as MuiSwitch } from '@mui/material';

import { useController, FieldProps } from './helpers';
import type { Form } from './Form';

/**
 * Creates a switch field to be used in a {@link Form}.
 * @param props - The {@link FieldProps} for the switch.
 * @returns A {@link Switch} component.
 */
export const Switch = (props: FieldProps) => {
    const { field } = useController(props);

    return (
        <FormControl size='small'>
            <FormControlLabel
                control={
                    <MuiSwitch
                        {...field}
                        id={`${props.id}-switch`}
                        checked={!!field.value}
                        disabled={props.disabled}
                        size='small'
                        sx={{ pointerEvents: 'auto' }}
                    />
                }
                label={props.label}
                sx={{ mt: 1.5, pointerEvents: 'none' }}
            />
        </FormControl>
    );
};
