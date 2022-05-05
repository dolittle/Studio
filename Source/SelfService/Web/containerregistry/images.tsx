// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';

import {
    Table, TableContainer, TableHead,
    TableRow, TableCell, TableBody
} from '@mui/material';

import Paper from '@mui/material/Paper';
import { ContainerRegistryImages } from '../api/containerregistry';

type Props = {
    applicationId: string
    environment: string
    data: ContainerRegistryImages
};

export const View: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const _props = props!;
    const containerRegistryImages = _props.data;
    const applicationId = _props.applicationId;
    const environment = _props.environment;

    return (
        <>
            <p>{containerRegistryImages.url}</p>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 480 }} aria-label="Docker images" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Name</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {containerRegistryImages.images.map(row => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        const href = `/containerregistry/application/${applicationId}/${environment}/overview/tags/${row.name}`;
                                        history.push(href);
                                    }}
                                    sx={{
                                        '&:hover': {
                                            textDecoration: 'underline',
                                            cursor: 'pointer',
                                        }
                                    }}
                                >
                                    {row.name}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
