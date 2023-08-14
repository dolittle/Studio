// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useNavigate, generatePath } from 'react-router-dom';

import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import { ContainerRegistryImages } from '../../apis/solutions/containerregistry';

export type ViewProps = {
    applicationId: string;
    environment: string;
    data: ContainerRegistryImages;
};

export const View = ({ applicationId, environment, data }: ViewProps) => {
    const navigate = useNavigate();

    return (
        <>
            <p>{data.url}</p>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 480 }} aria-label="Docker images" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Name</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.images.map(row => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        const href = generatePath(
                                            '/containerregistry/application/:applicationId/:environment/overview/tags/:image',
                                            { applicationId, environment, image: encodeURIComponent(row.name) }
                                        );
                                        navigate(href);
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
