// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { DataGridPro, GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid-pro';
import { Paper, Tooltip } from '@mui/material';

import { Connection } from '../../apis/integrations/connections';

export type ConnectionsTableProps = {
    connections: Connection[];
    isLoading: boolean;
};

const connectionsColumns: GridColDef<Connection>[] = [
    {
        field: 'name',
        headerName: 'Name',
        minWidth: 270,
        flex: 1,
    },
    {
        field: 'description',
        headerName: 'Description',
        minWidth: 270,
        flex: 1,
    },
    {
        field: 'source',
        headerName: 'Source',
        minWidth: 270,
        flex: 1,
        valueGetter: ({ row }) => 'M3'
    },
    {
        field: 'status',
        headerName: 'Connection Status',
        minWidth: 270,
        flex: 1,
        valueGetter: ({ row }) => row?.status.name
    },
];

export const ConnectionsTable = ({ connections, isLoading }: ConnectionsTableProps) => {

    return (
        <Paper sx={{ width: 1 }}>
            <DataGridPro
                rows={connections}
                columns={connectionsColumns}
                getRowHeight={() => 'auto'}
                autoHeight
                headerHeight={46}
                disableColumnMenu
                hideFooter
                disableSelectionOnClick
                loading={isLoading}
                // onRowClick={({ row }) => onTableRowClick(row.id)}
            />
        </Paper>
    );
};

