// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';

import { HttpResponsePodStatus, PodInfo, ContainerStatusInfo, restartMicroservice } from '../../api/api';
import { useSnackbar } from 'notistack';

import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { RestartAlt } from '@mui/icons-material';

import { ViewLogIcon, DownloadLogIcon } from '../../assets/icons';
import { ButtonText } from '../../theme/buttonText';

import { DataGridPro, GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid-pro';

const columns: GridColDef[] = [
    {
        field: 'container',
        headerName: 'Container',
        minWidth: 200,
        flex: 1,
    },
    {
        field: 'restarts',
        headerName: 'Restarts',
        minWidth: 200,
        flex: 1
    },
    {
        field: 'age',
        headerName: 'Age',
        minWidth: 200,
        flex: 1
    },
    {
        field: 'started',
        headerName: 'Started',
        minWidth: 200,
        flex: 1
    },
    {
        field: 'status',
        headerName: 'Status',
        minWidth: 200,
        flex: 1
    },
    {
        field: 'download',
        headerName: 'Download logs',
        minWidth: 200,
        flex: 1
    },
];

const styles = {
    restartBtn: {
        fontWeight: 500,
        lineHeight: '22px',
        letterSpacing: '0.06em'
    }
};

type HealthStatusProps = {
    status: string
    data: HttpResponsePodStatus
    environment: string
    applicationId: string
    microserviceId: string
};

type Item = {
    key: string
    name: string
    state: string
    age: string
    image: string
    started: string
    restarts: number
    pod: PodInfo
    container: ContainerStatusInfo
};

export const HealthStatus = ({ applicationId, microserviceId, data, environment }: HealthStatusProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    //console.log(data)

    const items: any[] = data.pods.flatMap(pod => {
        console.log(pod)
        return pod.containers.map((container, index) => {
            const name = index === 0 ? pod.name : '';
            const item = {
                key: `${pod.name}-${container.name}`,
                name,
                image: container.image,
                state: container.state,
                started: container.started,
                age: container.age,
                restarts: container.restarts,
                container,
                pod,
                id: microserviceId
            } as Item;

            //console.log(item)
            return item

            const podInfo = item!.pod;

            /* return (
                <TableRow key={item.key}>
                    <TableCell align="left">
                        {item.name}
                    </TableCell>
                    <TableCell align="right">{item.state}</TableCell>
                    <TableCell align="right">{item.restarts}</TableCell>
                    <TableCell align="right">{item.age}</TableCell>
                    <TableCell align="right">{item.started}</TableCell>
                    <TableCell align="right">{item.image}</TableCell>
                    <TableCell align="right">
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="stretch"
                        >
                            <div onClick={() => {
                                alert('TODO: Download logs');
                            }}>
                                {DownloadLogIcon}
                            </div>
                            <div onClick={() => {
                                const href = `/microservices/application/${applicationId}/${environment}/pod/view/${podInfo.name}/logs?containerName=${container.name}`;
                                history.push(href);
                            }}>
                                {ViewLogIcon}
                            </div>
                        </Grid>
                    </TableCell>
                </TableRow>
            ); */
        });
    }) as any[];

    //console.log(items)

    const handleRestart = async () => {
        const success = await restartMicroservice(applicationId, environment, microserviceId);

        if (!success) {
            enqueueSnackbar('Failed to restart microservice', { variant: 'error' });
            return;
        }

        window.location = window.location;
    };

    return (
        <>
            <ButtonText
                sx={styles.restartBtn}
                startIcon={<RestartAlt />}
                onClick={handleRestart}>
                Restart microservice
            </ButtonText>

            <Box component={Paper} sx={{ mt: 2.5 }}>
                <DataGridPro
                    rows={items}
                    columns={columns}
                    disableColumnMenu
                    hideFooter
                    autoHeight={true}
                    loading={!items}
                    disableSelectionOnClick
                //onRowClick={(params) => onTableRowClick(params.row.id)}
                />
                {/*  <TableContainer>
                    <Table size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Restarts</TableCell>
                                <TableCell align="right">Age</TableCell>
                                <TableCell align="right">Started</TableCell>
                                <TableCell align="right">Container</TableCell>
                                <TableCell align="right">View Logs</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items}
                        </TableBody>
                    </Table>
                </TableContainer> */}
            </Box>
        </>
    );
};
