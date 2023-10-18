// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Typography } from '@mui/material';

const styles = {
    p: 1,
    letterSpacing: '0.17px',
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

    /**
     * The children to display in the custom toolbar.
     */
    children?: React.ReactNode;
};

/**
 * Custom toolbar component for the DataGrid.
 * @param {DataGridCustomToolbarProps} props - The {@link DataGridCustomToolbarProps}.
 * @returns A {@link DataGridCustomToolbar} component.
 */
export const DataGridCustomToolbar = ({ title, children }: DataGridCustomToolbarProps) =>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='body2' sx={styles}>{title}</Typography>
        {children}
    </Box>;
