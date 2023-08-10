// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { DataGridPro, DataGridProProps } from '@mui/x-data-grid-pro';

import { DataGridWrapper } from './DataGridWrapper';

// Use these props on every DataGrid in the application.
export const dataGridDefaultProps: DataGridProProps = {
    columns: [],
    rows: [],
    autoHeight: true,
    headerHeight: 46,
    getRowHeight: () => 'auto',
    getEstimatedRowHeight: () => 40,
    hideFooter: true,
    disableSelectionOnClick: true,
    disableColumnMenu: true,
    disableColumnReorder: true,
    disableColumnResize: true,
    disableColumnSelector: true,
};

export const DataGrid = (args: DataGridProProps) =>
    <DataGridWrapper sx={{ minHeight: 250 }}>
        <DataGridPro {...dataGridDefaultProps} {...args} />
    </DataGridWrapper>;
