// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { GridColDef } from '@mui/x-data-grid-pro';

import { Button, DataGridEditCellEdit, DataGridEditCellView } from '@dolittle/design-system';

import { EnvironmentVariableTableRowParams } from './DataGrid';

export const dataGridColumns: GridColDef<EnvironmentVariableTableRowParams>[] = [
    {
        field: 'name',
        headerName: 'Name',
        width: 330,
        editable: true,
        renderCell: DataGridEditCellView,
        renderEditCell: DataGridEditCellEdit,
    },
    {
        field: 'value',
        headerName: 'Value',
        width: 330,
        editable: true,
        renderCell: DataGridEditCellView,
        renderEditCell: DataGridEditCellEdit,
    },
    {
        field: 'isSecret',
        headerName: 'Secret',
        width: 120,
        editable: true,
        type: 'singleSelect',
        valueOptions: [{ value: true, label: 'Yes' }, { value: false, label: 'No' }],
        renderCell: ({ value }) => (
            <Button label={value ? 'Yes' : 'No'} color='subtle' endWithIcon='ArrowDropDownRounded' sx={{ width: 1, height: 1 }} />
        ),
    },
];
