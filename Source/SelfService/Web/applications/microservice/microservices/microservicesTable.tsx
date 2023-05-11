// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getPodStatus, MicroserviceObject } from '../../../apis/solutions/api';
import { HttpResponseApplication } from '../../../apis/solutions/application';

import { DataGridPro, GridColDef, GridRenderCellParams } from '@mui/x-data-grid-pro';
import { Paper, Tooltip } from '@mui/material';

import { StatusIndicator } from '@dolittle/design-system';

import { getPodHealthStatus, getRuntimeNumberFromString } from '../../../utils/helpers';

type HealthStatusTableRowProps = {
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
        return <span>{params.value}</span>;
    }
};

const StatusCell = (params: GridRenderCellParams<any, HealthStatusTableRowProps['row']>) => {
    const status = params.value?.toLowerCase();

    return (
        <StatusIndicator status={getPodHealthStatus(status).status} label={getPodHealthStatus(status).label} />
    );
};

type MicroserviceTableProps = {
    environment: string;
    application: HttpResponseApplication;
    microservices: MicroserviceObject[];
};

export const MicroserviceTable = ({ application, environment, microservices }: MicroserviceTableProps) => {
    const navigate = useNavigate();
    const [microserviceRows, setMicroserviceRows] = useState<(MicroserviceObject | undefined)[]>([]);
    const [loadingRows, setLoadingRows] = useState(true);

    const getMicroserviceStatus = useCallback(async (microserviceId: string) => {
        const status = await getPodStatus(application.id, environment, microserviceId);
        return status.pods;
    }, [application.id, environment]);

    useEffect(() => {
        setLoadingRows(true);
        Promise.all(microservices.map(async microservice => {
            const status = await getMicroserviceStatus(microservice.id);

            return {
                ...microservice,
                phase: status[0]?.phase,
            } as MicroserviceObject;
        })).then(data => {
            setMicroserviceRows(data);
        }).finally(() => {
            setLoadingRows(false);
        });

    }, [microservices]);

    const microserviceColumns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 270,
            flex: 1,
        },
        {
            field: 'image',
            headerName: 'Container Image',
            minWidth: 270,
            flex: 1,
            valueGetter: ({ row }: HealthStatusTableRowProps) =>
                `${row.edit?.extra?.headImage || 'N/A'}`,
        },
        {
            field: 'runtime',
            headerName: 'Runtime',
            minWidth: 270,
            flex: 1,
            valueGetter: ({ row }: HealthStatusTableRowProps) =>
                getRuntimeNumberFromString(row.edit?.extra?.runtimeImage || 'N/A'),
        },
        {
            field: 'isPublic',
            headerName: 'Public URL',
            minWidth: 270,
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
            minWidth: 270,
            flex: 1,
            renderCell: StatusCell,
        },
    ];

    const onTableRowClick = (microserviceId: string) => {
        const href = `/microservices/application/${application.id}/${environment}/view/${microserviceId}`;
        navigate(href);
    };

    return (
        <Paper sx={{ width: 1 }}>
            <DataGridPro
                rows={microserviceRows}
                columns={microserviceColumns}
                getRowHeight={() => 'auto'}
                autoHeight
                headerHeight={46}
                disableColumnMenu
                hideFooter
                disableSelectionOnClick
                loading={loadingRows}
                onRowClick={({ row }) => onTableRowClick(row.id)}
            />
        </Paper>
    );
};
