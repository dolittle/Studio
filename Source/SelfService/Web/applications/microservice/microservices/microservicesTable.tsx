// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getPodStatus, MicroserviceObject } from '../../../apis/solutions/api';
import { HttpResponseApplication } from '../../../apis/solutions/application';
import { customStatusFieldSort } from '../components/microserviceStatus';

import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';
import { Paper, Tooltip } from '@mui/material';

import { StatusIndicator } from '@dolittle/design-system';

import { getPodHealthStatus, getRuntimeNumberFromString } from '../../../utils/helpers';

type HealthStatusTableRowProps = {
    row: MicroserviceObject & { value: string };
};

const PublicUrlCell = ({ row }: HealthStatusTableRowProps) => {
    const hasPublicUrl = row.edit?.extra?.isPublic;

    return (
        // TODO: Tooltip needs public urls. Map them into title.
        <Tooltip title={``} arrow>
            <span>
                {hasPublicUrl === true ? 'Available' :
                    hasPublicUrl === false ? 'None' :
                        'N/A'
                }
            </span>
        </Tooltip>
    );
};

const StatusCell = ({ row }: HealthStatusTableRowProps) => {
    const status = row.value?.toLowerCase();

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

    // TODO: This is a hack to get the sorting to work. We need to fix this.
    const customUrlFieldSort = (v1, v2, param1, param2) => {
        const firstObject = microserviceRows.filter(row => row?.id === param1.id);
        const secondObject = microserviceRows.filter(row => row?.id === param2.id);

        const isFirstPublic = firstObject[0]?.edit?.extra?.isPublic;
        const isSecondPublic = secondObject[0]?.edit?.extra?.isPublic;

        const compareFirst = isFirstPublic ? 'Available' : 'None';
        const compareSecond = isSecondPublic ? 'Available' : 'None';

        return compareFirst.localeCompare(compareSecond);
    };

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
            renderCell: PublicUrlCell,
            sortComparator: customUrlFieldSort,
        },
        {
            field: 'phase',
            headerName: 'Status',
            minWidth: 270,
            flex: 1,
            renderCell: StatusCell,
            sortComparator: customStatusFieldSort,
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
