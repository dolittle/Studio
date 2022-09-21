// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box } from '@mui/material';
import { GridColDef, GridColumnHeaderParams, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid-pro';

import { Summary } from '@dolittle/design-system/atoms/Metrics/Summary';

import { formatTime, formatStartingDate, DownloadLogs } from './helpers';
import { statusCell } from '../../microserviceStatus';

export const columns: GridColDef[] = [
    {
        field: 'image',
        headerName: 'Container',
        headerClassName: 'move-container-header-left',
        sortable: false,
        // minWidth: 534,
        flex: 1,
    },
    {
        field: 'restarts',
        headerName: 'Crashes',
        sortable: false,
        // minWidth: 100,
        flex: 1,
        headerAlign: 'right',
        align: 'right'
    },
    {
        field: 'age',
        headerName: 'Age',
        sortable: false,
        // minWidth: 180,
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
        // minWidth: 216,
        flex: 1,
        headerAlign: 'right',
        align: 'right',
        valueGetter: (params: GridValueGetterParams) =>
            formatStartingDate(params.row?.started)
    },
    {
        field: 'CPU',
        sortable: false,
        // minWidth: 170,
        flex: 1,
        headerAlign: 'left',
        align: 'left',
        renderHeader: (params: GridColumnHeaderParams) =>
            <Box className='MuiDataGrid-columnHeaderTitle'>
                CPU <Box component='span' sx={{fontSize: '0.75rem', fontWeight: '400'}}>Avg | Max | Now</Box>
            </Box>,
        renderCell: (params: GridRenderCellParams) =>
            <Summary now={50} avg={10} max={80} unit='%' description='CPU usage' period='last 24h' digits={0} />,
    },
    {
        field: 'memory',
        headerName: 'Memory',
        sortable: false,
        // minWidth: 170,
        flex: 1,
        headerAlign: 'left',
        align: 'left',
        renderHeader: (params: GridColumnHeaderParams) =>
            <Box className='MuiDataGrid-columnHeaderTitle'>
                Memory <Box component='span' sx={{fontSize: '0.75rem', fontWeight: '400'}}>Avg | Max | Now</Box>
            </Box>,
        renderCell: (params: GridRenderCellParams) =>
            <Summary now={2} avg={1} max={9.2} unit='MiB' description='Memory usage' period='last 24h' digits={2} />,
    },
    {
        field: 'state',
        headerName: 'Status',
        sortable: false,
        // minWidth: 168,
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        renderCell: statusCell
    },
    {
        field: 'download',
        headerName: 'Download logs',
        sortable: false,
        // minWidth: 132,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: DownloadLogs
    },
];
