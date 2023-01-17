// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { FormControl, FormControlLabel, Switch as MuiSwitch, SxProps } from '@mui/material';

import { useController, FieldProps } from './helpers';
import type { Form } from './Form';

export type SwitchProps = {
    sx?: SxProps;
} & FieldProps;

/**
 * Creates a switch field to be used in a {@link Form}.
 * @param props The {@link FieldProps} for the switch.
 * @returns A new {@link Switch} component.
 */
export const Switch = (props: SwitchProps) => {
    const { field } = useController(props);

    return (
        <FormControl>
            <FormControlLabel
                control={
                    <MuiSwitch {...field} size='small' checked={!!field.value} disabled={props.disabled} sx={{ pointerEvents: 'auto' }} />
                }
                label={props.label}
                sx={{ mt: 1.5, ...props.sx, pointerEvents: 'none' }}
            />
        </FormControl>
    );
};
