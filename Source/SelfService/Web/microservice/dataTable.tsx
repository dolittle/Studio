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
    dataTable: {
        '.MuiDataGrid-row': {
            cursor: 'pointer'
        },
        '.MuiDataGrid-columnSeparator': {
            display: 'none'
        },
        '.MuiDataGrid-columnHeader:focus': {
            outline: 'none'
        },
        '.MuiDataGrid-columnHeader:focus-within': {
            outline: 'none'
        },
        '.MuiDataGrid-columnHeaderDraggableContainer': {
            outline: 'none'
        },
        '.MuiDataGrid-cell:focus-within': {
            outline: 'none'
        },
        '.MuiIconButton-root': {
            'visibility': 'visible',
            ':hover': {
                backgroundColor: 'transparent'
            }
        },
        '.MuiDataGrid-sortIcon': {
            color: 'rgba(255, 255, 255, 0.38);',
            width: '1.25rem',
            height: '1.25rem'
        },
        '.MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted) .MuiDataGrid-sortIcon': {
            opacity: 1
        }
    },
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

export type MicroserviceObject = {
    id: string
    name: string
    kind: string
    environment: string
    live: MicroserviceInfo
    edit: {
        extra: {
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

    const microserviceStatusInfo = (params: GridRenderCellParams) => {
        try {
            const status = params.row.status[0].phase;
            const checkStatus = status.toLowerCase();

            let color = themeDark.palette.text.primary;
            let icon = <QuestionMark sx={{ color }} />;

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
            console.error(`Error with '${params.row.name}' status.`);
            return '';
        }
    };

    const customUrlFieldSort = (v1, v2, param1, param2) => {
        const firstObject = rows.filter((row: any) => row.id === param1.id);
        const secondObject = rows.filter((row: any) => row.id === param2.id);

        const isFirstPublic = firstObject[0]?.edit.extra.isPublic;
        const isSecondPublic = secondObject[0]?.edit.extra.isPublic;

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
                `${params.row.edit.extra.headImage || ''}`,
        },
        {
            field: 'runtime',
            headerName: 'Runtime',
            minWidth: 200,
            flex: 1,
            valueGetter: (params: GridValueGetterParams) => {
                const runtimeVersion = params.row.edit.extra.runtimeImage.replace(/dolittle\/runtime:/gi, '');
                return `${runtimeVersion || 'None'}`;
            }
        },
        {
            field: 'isPublic',
            headerName: 'Public URL',
            minWidth: 200,
            flex: 1,
            // TODO: Tooltip needs public urls. Map them into title.
            renderCell: function tooltip(params: GridRenderCellParams) {
                return (
                    <Tooltip title={``} arrow>
                        <span>{params.row.edit.extra.isPublic ? 'Available' : 'None'}</span>
                    </Tooltip>
                );
            },
            sortComparator: customUrlFieldSort
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 200,
            flex: 1,
            renderCell: function statusInfo(params: GridRenderCellParams) {
                return <>{microserviceStatusInfo(params)}</>;
            },
            sortComparator: (v1, v2, param1, param2) => {
                return param1.value[0].phase.localeCompare(param2.value[0].phase);
            },
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
                sx={styles.dataTable}
                onRowClick={(params) => onTableRowClick(params.row.id)}
            /></Box>
    );
};
