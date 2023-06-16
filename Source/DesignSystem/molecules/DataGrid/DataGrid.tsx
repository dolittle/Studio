// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { DataGridPro, DataGridProProps } from '@mui/x-data-grid-pro';

import { Paper } from '@mui/material';

const stylesJustForStorybook = {
    minHeight: 250,
};

// Use these props and styles on every DataGrid in the application.
export const DataGrid = (args: DataGridProProps) =>
    <Paper elevation={1} sx={{ width: 1, boxShadow: 'none', ...stylesJustForStorybook }}>
        <DataGridPro
            autoHeight
            headerHeight={46}
            getRowHeight={() => 'auto'}
            getEstimatedRowHeight={() => 40}
            hideFooter
            disableSelectionOnClick
            disableColumnMenu
            disableColumnReorder
            disableColumnResize
            disableColumnSelector
            {...args}
        />
    </Paper>;
