// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { HttpResponseApplication } from '../../api/application';
import { getPodStatus, MicroserviceInfo } from '../../api/api';

import { useReadable } from 'use-svelte-store';
import { canEditMicroservices, microservices } from '../../stores/microservice';

import { themeDark } from '../../theme/theme';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { CheckCircleRounded, ErrorRounded, RocketLaunch, WarningRounded } from '@mui/icons-material';
import { DataGridPro, GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid-pro';

import { NoMicroservices } from '../noMicroservices';

const styles = {
    createMicroserviceBtn: {
        background: 'linear-Gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), #191A21',
        fontSize: '0.8125rem',
        fontWeight: '500',
        marginBlockStart: '1.0625rem',
        minBlockSize: '36px'
    },
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

type MicroservicesOverviewScreenProps = {
    environment: string
    application: HttpResponseApplication
};

type MicroserviceObject = {
    id: string
    name: string
    kind: string
    environment: string
    live: MicroserviceInfo,
    edit: {},
    status?: []
};

export const MicroservicesOverviewScreen: React.FC<MicroservicesOverviewScreenProps> = (
    { environment, application }: MicroservicesOverviewScreenProps) => {

    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const $microservices = useReadable(microservices) as MicroserviceObject[];

    const [rows, setRows] = useState<(MicroserviceObject | undefined)[]>([]);
    const [hasMicroservices, setHasMicroservices] = useState(false);

    const { environments } = application;
    const canEdit = canEditMicroservices(environments, environment);
    let tempEnvironments = environments.map(e => e.name);
    tempEnvironments = [...tempEnvironments, ...$microservices.map(item => item.environment)];
    const newEnvironments = [...new Set(tempEnvironments)];
    const hasEnvironments = newEnvironments.length > 0;

    useEffect(() => {
        const filteredMicroservices = $microservices.filter(microservice => microservice.environment === environment);
        setHasMicroservices(filteredMicroservices.length > 0);

        const mapStatusToMicroservicesAndSetState = async () => {
            const rows = await Promise.all(filteredMicroservices.map(async microservice => {
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

    const handleCreateMicroservice = () => {
        if (!canEdit) {
            enqueueSnackbar('Currently disabled, please reach out via freshdesk or teams.', { variant: 'error' });
            return;
        }

        const href = `/microservices/application/${application.id}/${environment}/create`;
        history.push(href);
    };

    const handleCreateEnvironment = () => {
        // TODO How to stop this if automation disabled, currently on the environment level
        const href = `/environment/application/${application.id}/create`;
        history.push(href);
    };

    const onTableRowClick = (microserviceId: string) => {
        const href = `/microservices/application/${application.id}/${environment}/view/${microserviceId}`;
        history.push(href);
    };

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

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1
        },
        {
            field: 'image',
            headerName: 'Container Image',
            flex: 1,
            valueGetter: (params: GridValueGetterParams) =>
                `${params.row.edit.extra.headImage || ''}`,
        },
        {
            field: 'runtime',
            headerName: 'Runtime',
            flex: 1,
            valueGetter: (params: GridValueGetterParams) => {
                const runtimeNumber = params.row.edit.extra.runtimeImage.replace(/[dolittle/runtime:]/gi, '');
                return `${runtimeNumber || 'None'}`;
            }
        },
        {
            field: 'publicURL',
            headerName: 'Public URL',
            flex: 1,
            // TODO: Tooltip needs public urls
            // eslint-disable-next-line react/display-name
            renderCell: (params: GridRenderCellParams) => (
                <Tooltip title={``} arrow>
                    <span>{params.row.edit.extra.isPublic ? 'Available' : 'None'}</span>
                </Tooltip>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            // eslint-disable-next-line react/display-name
            renderCell: (params: GridRenderCellParams) => {
                return <>{microserviceStatusInfo(params)}</>;
            },
        },
    ];

    return (
        <>
            {!hasEnvironments && <Button onClick={handleCreateEnvironment}>Create New Environment</Button>}

            <Typography variant='h1' my={2}>Microservices</Typography>

            {hasMicroservices && <Box sx={{ inlineSize: '100%' }}>
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
                /></Box>}

            {hasEnvironments && (
                <Button
                    onClick={handleCreateMicroservice}
                    startIcon={<RocketLaunch />}
                    fullWidth
                    sx={styles.createMicroserviceBtn}
                >
                    Deploy New Microservice
                </Button>
            )}

            {!hasMicroservices && <NoMicroservices onCreate={handleCreateMicroservice} />}
        </>
    );
};
