// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { FormGroup, FormControlLabel, Switch, SwitchProps } from '@mui/material';

export const SwitchLabels = (props: SwitchProps) =>
    <FormGroup sx={{ width: 1 }}>
        <FormControlLabel
            control={<Switch defaultChecked={props.defaultChecked} size='small' />}
            label={props.title}
            disabled={props.disabled}
            sx={props.sx}
        />
    </FormGroup>;
