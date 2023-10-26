// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Paper, SxProps } from '@mui/material';

/**
 * Default styles for the DataGridWrapper component.
 */
const dataGridDefaultStyles: SxProps = {
    'width': 1,
    'boxShadow': 'none',
    '& .MuiDataGrid-root .MuiDataGrid-cell--editable': {
        p: 0,
    },
};

/**
 * The props for a {@link DataGridWrapper} component.
 */
export type DataGridWrapperProps = {
    /**
     * The background color of the DataGridWrapper component.
     * @default 'default'
     */
    background?: 'default' | 'dark';

    /**
     * The Data Grid component.
     */
    children: React.ReactNode;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;
};

/**
 * Wrapper for the DataGrid component.
 * @param {DataGridWrapperProps} props Props for the DataGridWrapper component.
 * @returns DataGridWrapper component.
 */
export const DataGridWrapper = ({ background, children, sx }: DataGridWrapperProps) =>
    <Paper elevation={background === 'dark' ? 0 : 1} sx={{ ...dataGridDefaultStyles, ...sx }}>
        {children}
    </Paper>;
