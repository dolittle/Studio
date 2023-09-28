// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid-pro';
import { Tooltip } from '@mui/material';

import { StatusIndicator } from '@dolittle/design-system';

import { MicroserviceObject } from '../../../../apis/solutions/api';

import { getPodHealthStatus, getRuntimeNumberFromString } from '../../../../utils/helpers';

export type HealthStatusTableRowProps = {
    row: MicroserviceObject;
};

// TODO: Add this when I know how to get the public urls.
const PublicUrlCell = (params: GridRenderCellParams<any, HealthStatusTableRowProps['row']>) => {
    const hasPublicUrl = params.row.edit?.extra?.isPublic;
    const publicUrl = params.row.edit?.extra?.ingress?.path || '';

    if (hasPublicUrl) {
        return (
            <Tooltip title={publicUrl}>
                <span>{params.value}</span>
            </Tooltip>
        );
    } else {
        return (
            <span>{params.value}</span>
        );
    }
};

const StatusCell = ({ value }: GridRenderCellParams<any, HealthStatusTableRowProps['row']>) =>
    <StatusIndicator status={getPodHealthStatus(value).status} label={getPodHealthStatus(value).label} />;

export const microservicesDataGridColumns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'environment',
        headerName: 'Environment',
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'image',
        headerName: 'Container Image',
        minWidth: 250,
        flex: 1,
        valueGetter: ({ row }: HealthStatusTableRowProps) =>
            `${row.edit?.extra?.headImage || 'N/A'}`,
    },
    {
        field: 'runtime',
        headerName: 'Runtime',
        minWidth: 150,
        flex: 1,
        valueGetter: ({ row }: HealthStatusTableRowProps) =>
            getRuntimeNumberFromString(row.edit?.extra?.runtimeImage || 'N/A'),
    },
    {
        field: 'isPublic',
        headerName: 'Public URL',
        minWidth: 150,
        flex: 1,
        //renderCell: PublicUrlCell,
        valueGetter: ({ row }: HealthStatusTableRowProps) => {
            const hasPublicUrl = row.edit?.extra?.isPublic;
            return hasPublicUrl === true ? 'Available' : hasPublicUrl === false ? 'None' : 'N/A';
        },
    },
    {
        field: 'phase',
        headerName: 'Status',
        minWidth: 150,
        flex: 1,
        renderCell: StatusCell,
    },
];
