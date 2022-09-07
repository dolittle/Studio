// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';

import { CSVLink } from 'react-csv';
import { getPodLogs } from '../../../api/api';

import { GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid-pro';
import { DownloadRounded } from '@mui/icons-material';

import { formatTime, formatStartingDate } from './helpers';
import { statusCell } from '../../microserviceStatus';

const DownloadLogs = (params: GridRenderCellParams) => {
    const [data, setData] = useState({ logs: '' });

    useEffect(() => {
        getPodLogs(params.row.application, params.row.podName, params.row.containerName).then(data => {
            setData(data);
            return;
        });
    }, []);

    return (
        <CSVLink
            data={data.logs}
            filename={`${params.row.podName}-${params.row.containerName}.csv`}
            target="_blank"
        >
            <DownloadRounded fontSize='small' sx={{ color: 'text.primary' }} />
        </CSVLink>
    )
};

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
