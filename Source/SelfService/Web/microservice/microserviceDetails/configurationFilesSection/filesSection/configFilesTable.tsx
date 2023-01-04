// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { DataGridPro, GridSelectionModel } from '@mui/x-data-grid-pro';
import { Paper } from '@mui/material';

const columns = [
    { field: 'path', headerName: 'Path', minWidth: 247, flex: 1 },
    { field: 'fileName', headerName: 'Name', minWidth: 247, flex: 1 },
    { field: 'dateAdded', headerName: 'Date Added', minWidth: 247, flex: 1 },
    { field: 'addedBy', headerName: 'Added By', minWidth: 247, flex: 1 },
];

export type ConfigFilesTableRow = {
    id: string;
    fileName: string;
    path: string;
    dateAdded: string;
    addedBy: string;
};

type DataTableProps = {
    rows: ConfigFilesTableRow[];
    selectionModel: GridSelectionModel;
    handleSelectionModelChange: (selectionModel: GridSelectionModel) => void;
};

export const ConfigFilesTable = ({ rows, handleSelectionModelChange, selectionModel }: DataTableProps) =>
    <Paper sx={{ width: 1, height: 1 }}>
        <DataGridPro
            rows={rows}
            columns={columns}
            getRowHeight={() => 'auto'}
            autoHeight={true}
            headerHeight={46}
            disableColumnMenu
            hideFooter
            checkboxSelection
            selectionModel={selectionModel}
            onSelectionModelChange={handleSelectionModelChange}
        />
    </Paper>;
