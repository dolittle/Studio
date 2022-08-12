// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getPodStatus, MicroserviceInfo } from '../api/api';
import { HttpResponseApplication } from '../api/application';

import { DataGridPro, GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid-pro';

import { themeDark } from '../theme/theme';
import { Box, Paper, Tooltip, Typography } from '@mui/material';
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
    if (runtimeVersion === undefined) return 'N/A';

    return `${runtimeVersion || 'None'}`;
};

const tooltipCell = (params: GridRenderCellParams) => {
    const publicUrl = params.row.edit?.extra?.isPublic;
    if (publicUrl === undefined) return 'N/A';

    return (
        // TODO: Tooltip needs public urls. Map them into title.
        <Tooltip title={``} arrow>
            <span>{params.row.edit?.extra?.isPublic ? 'Available' : 'None'}</span>
        </Tooltip>
    );
};

const microserviceStatusInfo = (params: GridRenderCellParams) => {
    let color = themeDark.palette.text.primary;
    let icon = <QuestionMark sx={{ color }} />;

    try {
        const status = params.row.status[0]?.phase;
        if (status === undefined) return 'N/A';

        const checkStatus = status.toLowerCase();

        if (checkStatus.includes('running')) {
            icon = <CheckCircleRounded />;
        } else if (checkStatus.includes('pending')) {
            color = themeDark.palette.warning.main;
            icon = <WarningRounded sx={{ color }} />;
        } else if (checkStatus.includes('failed')) {
            color = themeDark.palette.error.main;
            icon = <ErrorRounded sx={{ color }} />;
        }

        return (
            <Box sx={styles.status}>
                {icon}
                <Typography sx={{ ...styles.statusTitle, color }}>{status}</Typography>
            </Box>
        );
    } catch (err) {
        console.error(`Problem with ${params.row.name} status.`);
        return 'N/A';
    }
};

const statusCell = (params: GridRenderCellParams) => (
    <>{microserviceStatusInfo(params)}</>
);

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

    const getUrlRowById = (param) => rows.filter((row: any) => row.id === param.id);
    const customUrlFieldSort = (v1, v2, param1, param2) => {
        const firstObject = getUrlRowById(param1.id);
        const secondObject = getUrlRowById(param2.id);

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
            renderCell: tooltipCell,
            sortComparator: customUrlFieldSort
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 200,
            flex: 1,
            renderCell: statusCell,
            sortComparator: (v1, v2, param1, param2) =>
                param1.value[0]?.phase?.localeCompare(param2.value[0]?.phase)
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
