// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

import { HttpResponsePodStatus, PodInfo, ContainerStatusInfo } from '../../api/api';
import { ViewLogIcon, DownloadLogIcon } from '../../theme/icons';

type Props = {
    status: string
    data: HttpResponsePodStatus
    environment: string
    applicationId: string
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

export const HealthStatus: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const _props = props!;
    const applicationId = _props.applicationId;
    const status = _props.status;
    const data = _props.data;
    const environment = _props.environment;

    const items: any[] = data.pods.flatMap(pod => {
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
            } as Item;

            const podInfo = item!.pod;

            return (
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
            );
        });
    }) as any[];


    return (
        <Box component={Paper} m={2}>
            <TableContainer>
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
            </TableContainer>
        </Box>
    );

};
