// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Table, TableContainer, TableHead,
    TableRow, TableCell, TableBody
} from '@mui/material';

import Paper from '@mui/material/Paper';
import { ContainerRegistryTags, getTagsInContainerRegistry } from '../api/containerregistry';

type Props = {
    url: string
    applicationId: string
};

type ViewParams = {
    image: string;
};

export const View: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const { image } = useParams<ViewParams>();
    const applicationId = _props.applicationId;

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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {containerRegistryTags.tags.map(row => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
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
