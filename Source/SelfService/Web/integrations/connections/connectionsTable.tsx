// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';
import { Paper } from '@mui/material';

import { IconButton, StatusIndicator } from '@dolittle/design-system';

import { ConnectionModel } from '../../apis/integrations/generated';
import { CACHE_KEYS } from '../../apis/integrations/CacheKeys';
import { useConnectionsIdDelete } from '../../apis/integrations/connectionsApi.hooks';

import { getConnectionStatus } from '../../utils/helpers/connectionStatuses';

type ConnectionsTableRowProps = {
    row: ConnectionModel;
};

const StatusCell = ({ row }: ConnectionsTableRowProps) => {
    const status = row.status?.name?.toLowerCase();

    return (
        <StatusIndicator status={getConnectionStatus(status).status} label={getConnectionStatus(status).label} />
    );
};

export type ConnectionsTableProps = {
    connections: ConnectionModel[];
    isLoading: boolean;
};

export const ConnectionsTable = ({ connections, isLoading }: ConnectionsTableProps) => {
    const navigate = useNavigate();
    const deleteMutation = useConnectionsIdDelete();
    const queryClient = useQueryClient();

    const connectionsColumns: GridColDef<ConnectionModel>[] = [
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
            valueGetter: ({ row }: ConnectionsTableRowProps) => 'M3',
        },
        {
            field: 'status',
            headerName: 'Connection Status',
            minWidth: 270,
            flex: 1,
            renderCell: StatusCell,
        }
    ];

    const handleRowClick = (connectionModel: ConnectionModel) => {
        if (connectionModel.connectionId) {
            //TODO: Redirect correctly based on status
            const href = connectionModel.connectionId;
            navigate(href);
        }
    };

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
                onRowClick={({ row }) => handleRowClick(row)}
            />
        </Paper>
    );
};
