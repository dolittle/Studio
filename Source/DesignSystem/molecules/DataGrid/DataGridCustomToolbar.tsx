// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Typography } from '@mui/material';

const styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 1,
    gap: 2,
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
    <Box component='header' sx={styles}>
        <Typography variant='body2'>{title}</Typography>
        {children && <Box component='section' sx={{ display: 'flex', gap: 1 }}>{children}</Box>}
    </Box>;
