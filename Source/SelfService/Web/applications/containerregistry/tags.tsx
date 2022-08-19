// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
    Table, TableContainer, TableHead,
    TableRow, TableCell, TableBody
} from '@mui/material';

import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { ContainerRegistryTags, getTagsInContainerRegistry } from '../../apis/solutions/containerregistry';

type Props = {
    url: string
    environment: string
    applicationId: string
};

type ViewParams = {
    image: string;
};

export const View: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const { image } = useParams<ViewParams>();

    if(!image) {
        return null;
    }

    const applicationId = _props.applicationId;
    const environment = _props.environment;

    const [loaded, setLoaded] = useState(false);
    const [containerRegistryTags, setContainerRegistryTags] = useState({
        name: '',
        tags: [],
    } as ContainerRegistryTags);

    useEffect(() => {
        Promise.all([
            getTagsInContainerRegistry(applicationId, image)
        ]).then(values => {
            setContainerRegistryTags(values[0]);
            setLoaded(true);
        });
    }, []);

    const msCreatePath = `/microservices/application/${applicationId}/${environment}/create?kind=dolittle-microservice`;

    if (!loaded) {
        return null;
    }

    return (
        <>
            <p>{_props.url}/{image}</p>
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
                        {containerRegistryTags.tags.map(row => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="td" scope="row">
                                    <Link component={RouterLink}
                                          to={msCreatePath + '#head-image='+image+':'+row.name}>
                                        {row.name}
                                    </Link>
                                </TableCell>
                                <TableCell component="td" scope="row">
                                    {row.createdTime.toLocaleString()}
                                </TableCell>
                                <TableCell component="td" scope="row">
                                    {row.lastUpdateTime.toLocaleString()}
                                </TableCell>
                                <TableCell component="td" scope="row">
                                    <Link component={RouterLink}
                                          to={msCreatePath + '#head-image='+image+'@'+row.digest}>
                                        {row.digest}
                                    </Link>
                                </TableCell>
                                <TableCell component="td" scope="row">
                                    {row.signed ? 'true' : 'false' }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
