// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Chip as MuiChip, SxProps } from '@mui/material';

/**
 * The props for a {@link Chip} component.
 */
export type ChipProps = {
    label: string;
    onDelete?: () => void;
    sx?: SxProps;
};

/**
 * The {@link Chip} component is used to display a chip.
 */
export const Chip = ({ label, onDelete, sx }: ChipProps) =>
    <MuiChip
        label={label}
        color='primary'
        size='small'
        onDelete={onDelete}
        sx={sx}
    />;
