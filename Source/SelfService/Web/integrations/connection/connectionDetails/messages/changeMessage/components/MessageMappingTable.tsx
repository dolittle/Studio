// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Paper } from '@mui/material';
import { DataGridPro, GridColDef, GridSelectionModel, GridRowId } from '@mui/x-data-grid-pro';

import { MappableTableColumn } from '../../../../../../apis/integrations/generated';

type DataGridTableListingEntry = MappableTableColumn & {
    id: string;
};

const columns: GridColDef<DataGridTableListingEntry>[] = [
    {
        field: 'm3ColumnName',
        headerName: 'M3 Field Name',
        minWidth: 270,
        flex: 1,
    },
    {
        field: 'm3Description',
        headerName: 'M3 Description',
        minWidth: 270,
        flex: 1,
    },
];

export type MessageMappingTableProps = {
    mappableTableColumns: MappableTableColumn[];
    selectedIds: GridSelectionModel;
    onSelectedIdsChanged: (newSelectedIds: GridSelectionModel) => void;
    disabledRows?: GridRowId[];
    isLoading: boolean;
};

export const MessageMappingTable = ({ mappableTableColumns, selectedIds, onSelectedIdsChanged, disabledRows, isLoading, }: MessageMappingTableProps) => {
    const dataGridListing: DataGridTableListingEntry[] = mappableTableColumns
        .map(mappableTableColumn => {
            return {
                id: mappableTableColumn.m3ColumnName!,
                ...mappableTableColumn,
            };
        });

    return (
        <Paper sx={{ width: 1 }}>
            <DataGridPro
                rows={dataGridListing}
                columns={columns}
                getRowHeight={() => 'auto'}
                autoHeight
                headerHeight={46}
                checkboxSelection
                onSelectionModelChange={onSelectedIdsChanged}
                selectionModel={selectedIds}
                isRowSelectable={row => !disabledRows?.includes(row.id) || false}
                loading={isLoading}
                pagination
                pageSize={10}
                // rowsPerPageOptions={[10, 25, 50, 100]}
                disableColumnMenu
                disableSelectionOnClick
                hideFooterSelectedRowCount
            />
        </Paper>
    );
};
