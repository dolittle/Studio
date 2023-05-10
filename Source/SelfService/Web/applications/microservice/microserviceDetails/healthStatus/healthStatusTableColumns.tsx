// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid-pro';

import { StatusIndicator, Summary } from '@dolittle/design-system';

import { DownloadLogs, formatTime, formatStartingDate } from '../../../../utils/helpers';

import { HealthStatusTableRow } from './healthStatusTable';
import { healthStatus } from '../../components/microserviceStatus';

type HealthStatusTableRowProps = {
    row: HealthStatusTableRow;
};

const CpuFieldHeader = () =>
    <Stack sx={{ textAlign: 'center' }}>
        <Typography variant='body2' sx={{ fontWeight: '500', pb: 0.5 }}>CPU</Typography>
        <Typography variant='caption'>Avg | Max | Now</Typography>
    </Stack>;

const CpuCell = ({ row }: HealthStatusTableRowProps) =>
    <Summary now={row.cpu?.current} avg={row.cpu?.average} max={row.cpu?.maximum} unit='%' description='CPU usage' period='last 24h' digits={0} />;

const SummaryFieldHeader = () =>
    <Stack sx={{ textAlign: 'center' }}>
        <Typography variant='body2' sx={{ fontWeight: '500', pb: 0.5 }}>Memory</Typography>
        <Typography variant='caption'>Avg | Max | Now</Typography>
    </Stack>;

const SummaryCell = ({ row }: HealthStatusTableRowProps) =>
    <Summary now={row.memory?.current} avg={row.memory?.average} max={row.memory?.maximum} unit='MiB' description='Memory usage' period='last 24h' digits={0} />;

const StatusCell = ({ row }: HealthStatusTableRowProps) => {
    const status = row.state?.toLowerCase();

    return (
        <StatusIndicator status={healthStatus(status).status} label={healthStatus(status).label} />
    );
};

export const columns: GridColDef[] = [
    {
        field: 'image',
        headerName: 'Container',
        headerClassName: 'move-container-header-left',
        sortable: false,
        minWidth: 300,
        flex: 1,
    },
    {
        field: 'restarts',
        headerName: 'Crashes',
        sortable: false,
        minWidth: 100,
        flex: 1,
        headerAlign: 'right',
        align: 'right',
    },
    {
        field: 'age',
        headerName: 'Age',
        sortable: false,
        minWidth: 180,
        flex: 1,
        headerAlign: 'right',
        align: 'right',
        valueGetter: ({ row }: HealthStatusTableRowProps) => formatTime(row.age),
    },
    {
        field: 'started',
        headerName: 'Started',
        sortable: false,
        minWidth: 216,
        flex: 1,
        headerAlign: 'right',
        align: 'right',
        valueGetter: ({ row }: HealthStatusTableRowProps) => formatStartingDate(row.started),
    },
    {
        field: 'CPU',
        sortable: false,
        minWidth: 250,
        flex: 1,
        headerAlign: 'right',
        align: 'right',
        renderHeader: CpuFieldHeader,
        renderCell: CpuCell,
    },
    {
        field: 'memory',
        headerName: 'Memory',
        sortable: false,
        minWidth: 250,
        flex: 1,
        headerAlign: 'right',
        align: 'right',
        renderHeader: SummaryFieldHeader,
        renderCell: SummaryCell,
    },
    {
        field: 'state',
        headerName: 'Status',
        sortable: false,
        minWidth: 200,
        flex: 1,
        renderCell: StatusCell,
    },
    {
        field: 'download',
        headerName: 'Download logs',
        sortable: false,
        minWidth: 132,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: DownloadLogs,
    },
];
