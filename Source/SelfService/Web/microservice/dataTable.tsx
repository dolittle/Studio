// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getPodStatus, MicroserviceInfo } from '../api/api';
import { HttpResponseApplication } from '../api/application';

import { DataGridPro, GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid-pro';

import { themeDark } from '../theme/theme';
import { Box, Tooltip, Typography } from '@mui/material';
import { CheckCircleRounded, ErrorRounded, WarningRounded } from '@mui/icons-material';

const styles = {
    dataTable: {
        'background': 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), #191A21;',
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
            width: '20px',
            height: '20px'
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
        fontWeight: '500',
        fontSize: '12px',
        lineHeight: '22px',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        marginInlineStart: '10px'
    }
};

export type MicroserviceObject = {
    id: string,
    name: string,
    kind: string,
    environment: string,
    live: MicroserviceInfo,
    edit: {},
    status?: []
};

type DataTableProps = {
    environment: string,
    application: HttpResponseApplication,
    microservices: MicroserviceObject[]
};

export const DataTable: React.FC<DataTableProps> = ({ application, environment, microservices }: DataTableProps) => {
    const history = useHistory();
    const [rows, setRows] = useState<(MicroserviceObject | undefined)[]>([]);

    useEffect(() => {
        const mapStatusToMicroservicesAndSetState = async () => {
            const rows = await Promise.all(microservices.map(async microservice => {
                const status = await getMicroserviceStatus(microservice.id);

                return {
                    ...microservice,
                    status
                } as MicroserviceObject;
            }));

            setRows(rows);
        };

        mapStatusToMicroservicesAndSetState();
    }, [setRows]);

    const getMicroserviceStatus = (microserviceId: string) => {
        return new Promise((resolve, reject) => {
            resolve(
                getPodStatus(application.id, environment, microserviceId)
                    .then(res => res.pods)
                    .catch(err => reject(err))
            );
        });
    };

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 200,
            flex: 1
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
                const runtimeNumber = params.row.edit.extra.runtimeImage.replace(/[dolittle/runtime:]/gi, '');
                return `${runtimeNumber || 'None'}`;
            }
        },
        {
            field: 'isPublic',
            headerName: 'Public URL',
            minWidth: 200,
            flex: 1,
            sortable: false,
            // TODO: Tooltip needs public urls. Map them into title.
            renderCell: function tooltip(params: GridRenderCellParams) {
                return (
                    <Tooltip title={``} arrow>
                        <span>{params.row.edit.extra.isPublic ? 'Available' : 'None'}</span>
                    </Tooltip>
                );
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 200,
            flex: 1,
            renderCell: function statusInfo(params: GridRenderCellParams) {
                return <>{microserviceStatusInfo(params)}</>;
            },
            sortComparator: (v1, v2, param1: any, param2: any) => {
                return param1.value[0].phase.localeCompare(param2.value[0].phase);
            },
        },
    ];

    const microserviceStatusInfo = (params: GridRenderCellParams) => {
        const status = params.row.status[0].phase;
        const checkStatus = status.toLowerCase();

        let color = themeDark.palette.text.primary;
        let icon = <ErrorRounded sx={{ color }} />;

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
    };

    const onTableRowClick = (microserviceId: string) => {
        const href = `/microservices/application/${application.id}/${environment}/view/${microserviceId}`;
        history.push(href);
    };

    return (
        <Box sx={{ inlineSize: '100%' }}>
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
