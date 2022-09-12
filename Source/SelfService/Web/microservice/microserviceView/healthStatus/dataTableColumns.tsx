// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid-pro';

import { formatTime, formatStartingDate, DownloadLogs } from './helpers';
import { statusCell } from '../../microserviceStatus';

export const columns: GridColDef[] = [
    {
        field: 'image',
        headerName: 'Container',
        headerClassName: 'negativeRowSpanHack',
        sortable: false,
        minWidth: 534,
        flex: 1,
    },
    {
        field: 'restarts',
        headerName: 'Restarts',
        sortable: false,
        minWidth: 100,
        flex: 1,
        headerAlign: 'right',
        align: 'right'
    },
    {
        field: 'age',
        headerName: 'Age',
        sortable: false,
        minWidth: 180,
        flex: 1,
        headerAlign: 'right',
        align: 'right',
        valueGetter: (params: GridValueGetterParams) =>
            formatTime(params.row?.age)
    },
    {
        field: 'started',
        headerName: 'Started',
        sortable: false,
        minWidth: 216,
        flex: 1,
        headerAlign: 'right',
        align: 'right',
        valueGetter: (params: GridValueGetterParams) =>
            formatStartingDate(params.row?.started)
    },
    {
        field: 'state',
        headerName: 'Status',
        sortable: false,
        minWidth: 168,
        flex: 1,
        renderCell: statusCell
    },
    {
        field: 'download',
        headerName: 'Download logs',
        sortable: false,
        minWidth: 132,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: DownloadLogs
    },
];
