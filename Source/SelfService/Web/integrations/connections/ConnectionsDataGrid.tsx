// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useNavigate } from 'react-router-dom';

import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';
import { Paper } from '@mui/material';

import { StatusIndicator } from '@dolittle/design-system';

import { ConnectionModel } from '../../apis/integrations/generated';
import { getIndicatorStatusFromStatusMessage } from '../statusHelpers';


type ConnectionsDataGridRowProps = {
    row: ConnectionModel;
};

const StatusCell = ({ row }: ConnectionsDataGridRowProps) => {
    const status = getIndicatorStatusFromStatusMessage(row.status.statusMessage);

    return (
        <>{status && <StatusIndicator status={status.status} label={status.label} message={status.message} />}</>
    );
};

export type ConnectionsDataGridProps = {
    connections: ConnectionModel[];
    isLoading: boolean;
};

export const ConnectionsDataGrid = ({ connections, isLoading }: ConnectionsDataGridProps) => {
    const navigate = useNavigate();

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
            valueGetter: ({ row }: ConnectionsDataGridRowProps) => 'M3',
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
