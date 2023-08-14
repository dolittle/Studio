// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useParams, Link as RouterLink } from 'react-router-dom';

import { Link, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import { ContainerRegistryTags, getTagsInContainerRegistry } from '../../apis/solutions/containerregistry';

type ViewParams = {
    image: string;
};

export type ViewProps = {
    url: string;
    environment: string;
    applicationId: string;
};

export const View = ({ url, environment, applicationId }: ViewProps) => {
    const { image } = useParams<ViewParams>();
    if (!image) return null;

    const imagePath = `${url}/${image}`;

    const [containerRegistryTags, setContainerRegistryTags] = useState({
        name: '',
        tags: [],
    } as ContainerRegistryTags);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Promise.all([getTagsInContainerRegistry(applicationId, image)])
            .then(values => {
                setContainerRegistryTags(values[0]);
                setIsLoaded(true);
            });
    }, []);

    const msCreatePath = `/microservices/application/${applicationId}/${environment}/create?kind=dolittle-microservice`;

    if (!isLoaded) return null;

    return (
        <>
            <p>{imagePath}</p>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 480 }} aria-label="Docker images" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Name</b></TableCell>
                            <TableCell><b>Created At</b></TableCell>
                            <TableCell><b>Last Updated At</b></TableCell>
                            <TableCell><b>Digest</b></TableCell>
                            <TableCell><b>Signed</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {containerRegistryTags.tags.map(tag => (
                            <TableRow key={tag.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="td" scope="row">
                                    <Link component={RouterLink}
                                        to={`${msCreatePath}#head-image=${imagePath}:${tag.name}`}>
                                        {tag.name}
                                    </Link>
                                </TableCell>
                                <TableCell component="td" scope="row">
                                    {tag.createdTime.toLocaleString()}
                                </TableCell>
                                <TableCell component="td" scope="row">
                                    {tag.lastUpdateTime.toLocaleString()}
                                </TableCell>
                                <TableCell component="td" scope="row">
                                    <Link component={RouterLink}
                                        to={`${msCreatePath}#head-image=${imagePath}:${tag.name}@${tag.digest}`}>
                                        {tag.digest}
                                    </Link>
                                </TableCell>
                                <TableCell component="td" scope="row">
                                    {tag.signed ? 'true' : 'false'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
