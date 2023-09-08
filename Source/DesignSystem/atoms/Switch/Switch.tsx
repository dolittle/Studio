// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { FormControlLabel, Switch as MuiSwitch, SwitchProps as MuiSwitchProps } from '@mui/material';

/**
 * The props for a {@link NewSwitch} component.
 */
export type SwitchProps = {
    /**
     * The label to display.
     */
    label: string;

    /**
     * The size of the switch.
     * @default small
     */
    size?: 'small' | 'medium';

    /**
     * Whether or not the switch is disabled.
     * @default false
     */
    isDisabled?: boolean;

    /**
     * The function to call when the switch is toggled.
     */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
} & MuiSwitchProps;

/**
 * Simple switch component.
 * @param {SwitchProps} props - The {@link SwitchProps}.
 * @returns A {@link NewSwitch} component.
 */
export const NewSwitch = ({ label, size, isDisabled, onChange, ...switchProps }: SwitchProps) =>
    <FormControlLabel label={label} control={<MuiSwitch size={size ? size : 'small'} disabled={isDisabled} onChange={onChange} {...switchProps} />} />;
