// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Paper } from '@mui/material';
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';

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
    isLoading: boolean;
};

export const MessageMappingTable = ({ mappableTableColumns, isLoading }: MessageMappingTableProps) => {
    const dataGridListing: DataGridTableListingEntry[] = mappableTableColumns.map(mappableTableColumn => {
        return {
            id: mappableTableColumn.m3ColumnName || '',
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
                disableColumnMenu
                disableSelectionOnClick
                checkboxSelection
                loading={isLoading}
                pagination
                pageSize={10}
            //onRowClick={({ row }) => (row)}
            />
        </Paper>
    );
};
