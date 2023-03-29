// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useNavigate } from 'react-router-dom';

import { DataGridPro, GridColDef, GridValueGetterParams, GridRenderCellParams, GridEventListener } from '@mui/x-data-grid-pro';
import { Paper, Tooltip } from '@mui/material';

import { ConnectionModel } from '../../apis/integrations/generated';
import { Icon, IconButton } from '@dolittle/design-system';
import { useConnectionsIdDelete } from '../../apis/integrations/connectionsApi.hooks';
import { enqueueSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';
import { CACHE_KEYS } from '../../apis/integrations/CacheKeys';

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
            valueGetter: ({ row }) => 'M3'
        },
        {
            field: 'status',
            headerName: 'Connection Status',
            minWidth: 270,
            flex: 1,
            valueGetter: ({ row }) => row?.status?.name
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 100,
            flex: 1,
            renderCell({ row }) {
                return <IconButton icon='DeleteRounded' onClick={() => deleteConnection(row)} />;
            },
            valueGetter: ({ row }) => row?.status?.name
        },
    ];

    const handleRowClick = (connectionModel: ConnectionModel) => {
        if (connectionModel.connectionId) {
            const href = connectionModel.connectionId + '/messages';
            navigate(href);
        }
    };

    const deleteConnection = (connection: ConnectionModel) => {
        deleteMutation.mutate(
            { id: connection.connectionId! },
            {
                onSuccess() {
                    queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.Connections_GET] });
                    enqueueSnackbar(`Deleted connection: ${connection.connectionId}`, { variant: 'success' });
                },
                onError() {
                    enqueueSnackbar(`Error occurred when deleting connection: ${connection.connectionId}`, { variant: 'error' });
                },
            }
        );
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

