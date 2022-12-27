// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { FormGroup, FormControlLabel, Switch, SxProps } from '@mui/material';

export type SwitchToggleProps = {
    title: string;
    isChecked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isDisabled?: boolean;
    sx?: SxProps;
};

export const SwitchToggle = ({ title, isChecked, onChange, isDisabled, sx }: SwitchToggleProps) =>
    <FormGroup sx={{ width: 1 }}>
        <FormControlLabel
            label={title}
            control={<Switch size='small' checked={isChecked} onChange={onChange} />}
            disabled={isDisabled}
            sx={sx}
        />
    </FormGroup>;
