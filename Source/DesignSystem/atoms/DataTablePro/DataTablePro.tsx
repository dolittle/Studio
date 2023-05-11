// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { DataGridPro, DataGridProProps } from '@mui/x-data-grid-pro';

import { Paper } from '@mui/material';

export const DataTablePro = (args: DataGridProProps) =>
    <Paper sx={{ width: 1, height: 1, minHeight: 250, boxShadow: 'none' }}>
        <DataGridPro {...args} />
    </Paper>;
