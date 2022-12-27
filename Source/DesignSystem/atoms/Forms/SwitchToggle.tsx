// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { FormGroup, FormControlLabel, Switch, SwitchProps } from '@mui/material';

export const SwitchToggle = ({ checked, onChange, title, disabled, sx }: SwitchProps) =>
    <FormGroup sx={{ width: 1 }}>
        <FormControlLabel
            control={<Switch size='small' checked={checked} onChange={onChange} />}
            label={title}
            disabled={disabled}
            sx={sx}
        />
    </FormGroup>;
