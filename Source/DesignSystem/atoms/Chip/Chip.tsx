// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Chip as MuiChip, SxProps } from '@mui/material';

/**
 * The props for a {@link Chip} component.
 */
export type ChipProps = {
    /**
     * The label of the chip.
     */
    label: string;

    /**
     * The onDelete prop lets you add a delete functionality to the chip.
     */
    onDelete?: () => void;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;
};

/**
 * The chip component is used to show a small amount of information with a delete functionality.
 * @param {ChipProps} props - The {@link ChipProps}.
 * @returns A {@link Chip} component.
 */
export const Chip = ({ label, onDelete, sx }: ChipProps) =>
    <MuiChip
        label={label}
        color='primary'
        size='small'
        onDelete={onDelete}
        sx={sx}
    />;
