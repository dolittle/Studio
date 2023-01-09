// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { FormControl, FormControlLabel, Switch } from '@mui/material';

import { useController, FieldProps } from './helpers';
import type { Form } from './Form';

/**
 * Creates a switch field to be used in a {@link Form}.
 * @param props The {@link FieldProps} for the checkbox.
 * @returns A new {@link SwitchToggle} component.
 */
export const SwitchToggle = (props: FieldProps) => {
    const { field } = useController(props);

    return (
        <FormControl>
            <FormControlLabel
                control={
                    <Switch {...field} size='small' checked={!!field.value} disabled={props.disabled} />
                }
                label={props.label}
            />
        </FormControl>
    );
};
