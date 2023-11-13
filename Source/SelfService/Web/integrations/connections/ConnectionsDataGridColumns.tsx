// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { GridColDef } from '@mui/x-data-grid-pro';

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

export const connectionsDataGridColumns: GridColDef<ConnectionModel>[] = [
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
