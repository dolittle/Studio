// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getPodStatus, MicroserviceInfo } from '../api/api';
import { HttpResponseApplication } from '../api/application';

import { DataGridPro, GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid-pro';

import { Box, Paper, Tooltip, Theme, Typography } from '@mui/material';
import { CheckCircleRounded, ErrorRounded, WarningRounded, QuestionMark } from '@mui/icons-material';

const styles = {
    status: {
        display: 'flex',
        justifyContent: 'center'
    },
    statusTitle: {
        fontWeight: 500,
        fontSize: '0.75rem',
        lineHeight: '1.375rem',
        letterSpacing: '0.06rem',
        textTransform: 'uppercase',
        ml: 1.25
    }
};

const sortByRuntimeVersion = (params: GridValueGetterParams) => {
    const runtimeVersion = params.row.edit?.extra?.runtimeImage?.replace(/dolittle\/runtime:/gi, '');
    if (!runtimeVersion) return 'N/A';

    return `${runtimeVersion || 'None'}`;
};

const publicUrlCell = (params: GridRenderCellParams) => {
    const hasPublicUrl = params.row.edit?.extra?.isPublic;

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

enum MicroserviceStatus {
    Running = 0,
    Pending = 1,
    Failing = 2,
    Unknown = 3,
}

const getMicroserviceState = (phase?: string): MicroserviceStatus => {
    const checkStatus = phase?.toLowerCase?.();

    if (typeof checkStatus !== 'string') {
        return MicroserviceStatus.Unknown;
    } else if (checkStatus.includes('running')) {
        return MicroserviceStatus.Running;
    } else if (checkStatus.includes('pending')) {
        return MicroserviceStatus.Pending;
    } else if (checkStatus.includes('failed')) {
        return MicroserviceStatus.Failing;
    }

    return MicroserviceStatus.Unknown;
};

const statusCell = (params: GridRenderCellParams) => {
    let color = (theme: Theme) => theme.palette.text.primary;
    let icon = <QuestionMark sx={{ color }} />;
    let status = 'N/A';

    switch (getMicroserviceState(params.row.status[0]?.phase)) {
        case MicroserviceStatus.Running:
            icon = <CheckCircleRounded />;
            status = 'Running';
            break;
        case MicroserviceStatus.Pending:
            color = (theme: Theme) => theme.palette.warning.main;
            icon = <WarningRounded sx={{ color }} />;
            status = 'Pending';
            break;
        case MicroserviceStatus.Failing:
            color = (theme: Theme) => theme.palette.error.main;
            icon = <ErrorRounded sx={{ color }} />;
            status = 'Failed';
            break;
        case MicroserviceStatus.Unknown:
            return 'N/A';
    }

    return (
        <Box sx={styles.status}>
            {icon}
            <Typography sx={{ ...styles.statusTitle, color }}>{status}</Typography>
        </Box>
    );
};

const customStatusFieldSort = (_, __, left, right) => {
    const leftStatus = getMicroserviceState(left.value[0]?.phase);
    const rightStatus = getMicroserviceState(right.value[0]?.phase);
    return leftStatus - rightStatus;
};

export type MicroserviceObject = {
    id: string
    name: string
    kind: string
    environment: string
    live: MicroserviceInfo
    edit: {
        extra?: {
            isPublic: boolean
        }
    }
    status?: []
};

type DataTableProps = {
    environment: string
    application: HttpResponseApplication
    microservices: MicroserviceObject[]
};

export const DataTable = ({ application, environment, microservices }: DataTableProps) => {
    const history = useHistory();
    const [rows, setRows] = useState<(MicroserviceObject | undefined)[]>([]);

    const getMicroserviceStatus = useCallback(async (microserviceId: string) => {
        const status = await getPodStatus(application.id, environment, microserviceId);
        return status.pods;
    }, [application.id, environment]);

    useEffect(() => {
        Promise.all(microservices.map(async microservice => {
            const status = await getMicroserviceStatus(microservice.id);

            return {
                ...microservice,
                status
            } as MicroserviceObject;
        }))
            .then(setRows);
    }, []);

    const customUrlFieldSort = (v1, v2, param1, param2) => {
        const firstObject = rows.filter((row: any) => row.id === param1.id);
        const secondObject = rows.filter((row: any) => row.id === param2.id);

        const isFirstPublic = firstObject[0]?.edit?.extra?.isPublic;
        const isSecondPublic = secondObject[0]?.edit?.extra?.isPublic;

        const compareFirst = isFirstPublic ? 'Available' : 'None';
        const compareSecond = isSecondPublic ? 'Available' : 'None';

        return compareFirst.localeCompare(compareSecond);
    };

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 200,
            flex: 1,
        },
        {
            field: 'image',
            headerName: 'Container Image',
            minWidth: 200,
            flex: 1,
            valueGetter: (params: GridValueGetterParams) =>
                `${params.row.edit?.extra?.headImage || 'N/A'}`,
        },
        {
            field: 'runtime',
            headerName: 'Runtime',
            minWidth: 200,
            flex: 1,
            valueGetter: sortByRuntimeVersion
        },
        {
            field: 'isPublic',
            headerName: 'Public URL',
            minWidth: 200,
            flex: 1,
            renderCell: publicUrlCell,
            sortComparator: customUrlFieldSort
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 200,
            flex: 1,
            renderCell: statusCell,
            sortComparator: customStatusFieldSort
        },
    ];

    const onTableRowClick = (microserviceId: string) => {
        const href = `/microservices/application/${application.id}/${environment}/view/${microserviceId}`;
        history.push(href);
    };

    return (
        <Box component={Paper} sx={{ inlineSize: '100%' }}>
            <DataGridPro
                rows={rows}
                columns={columns}
                disableColumnMenu
                hideFooter
                autoHeight={true}
                loading={!rows}
                disableSelectionOnClick
                onRowClick={(params) => onTableRowClick(params.row.id)}
            /></Box>
    );
};
