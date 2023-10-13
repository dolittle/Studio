// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Typography } from '@mui/material';

const styles = {
    letterSpacing: '0.17px',
    py: 1.5,
    px: 2,
    borderBottom: '1px solid rgba(226, 255, 97, 0.05)',
};

/**
 * The props for a {@link DataGridCustomToolbarProps} component.
 */
export type DataGridCustomToolbarProps = {
    /**
     * The title to display in the custom toolbar.
     */
    title: string;
};

/**
 * Custom toolbar component for the DataGrid.
 * @param {DataGridCustomToolbarProps} props - The {@link DataGridCustomToolbarProps}.
 * @returns A {@link DataGridCustomToolbar} component.
 */
export const DataGridCustomToolbar = ({ title }: DataGridCustomToolbarProps) =>
    <Typography variant='body2' sx={styles}>{title}</Typography>;
