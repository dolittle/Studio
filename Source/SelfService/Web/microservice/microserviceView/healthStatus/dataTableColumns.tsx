// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';

import { useSnackbar } from 'notistack';

import { CSVLink } from 'react-csv';

import { getPodLogs } from '../../../api/api';

import { GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid-pro';
import { Button, IconButton, Link } from '@mui/material';
import { Close, DownloadRounded } from '@mui/icons-material';

import { formatTime, formatStartingDate } from './helpers';
import { statusCell } from '../../microserviceStatus';

const DownloadLogs = (params: GridRenderCellParams) => {
    const [data, setData] = useState({ logs: '' });

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        getPodLogs(params.row.application, params.row.podName, params.row.containerName).then(data => {
            setData(data);
            return;
        });
    }, []);

    const logsBlob = new Blob([data.logs], { type: 'text/plain' })
    const containerImage = params.row.image.replace(':', '/')

    const handleNotification = () => {
        enqueueSnackbar(`'${containerImage}' logs have been downloaded.`, {
            variant: 'default',
            persist: true,
            anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
            action: (key) => (
                <>
                    <Button
                        size='small'
                        onClick={() => alert(`Clicked on action of snackbar with id: ${key}`)}
                    >
                        Open
                    </Button>
                    <IconButton onClick={() => closeSnackbar(key)}>
                        <Close />
                    </IconButton>
                </>
            )
        });
    };

    return (
        <Link
            href={URL.createObjectURL(logsBlob)}
            download={`${containerImage}.log`}
            onClick={handleNotification}
        >
            <DownloadRounded fontSize='small' sx={{ color: 'text.primary' }} />
        </Link>
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
