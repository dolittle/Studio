// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { FormControl, FormControlLabel, Switch as MuiSwitch } from '@mui/material';

import { useController, FieldProps } from './helpers';
import type { Form } from './Form';

const styles = {
    formControl: {
        mt: 1.5,
        mx: 0,
        flexDirection: { xs: 'column-reverse', sm: 'row' },
        alignItems: 'flex-start',
        pointerEvents: 'none',
    },
    switch: {
        mt: { xs: 1, sm: 0 },
        pointerEvents: 'auto',
    },
};

/**
 * Creates a switch field to be used in a {@link Form}.
 * @param props - The {@link FieldProps}.
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
                        sx={styles.switch}
                    />
                }
                label={props.label}
                sx={styles.formControl}
            />
        </FormControl>
    );
};
