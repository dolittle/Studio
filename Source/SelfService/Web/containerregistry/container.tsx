// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useHistory, Switch, Route, Link } from 'react-router-dom';
import { HttpResponseApplication } from '../api/application';
import {
    Table, TableContainer, TableHead,
    TableRow, TableCell, TableBody
} from '@mui/material';

import { useReadable } from 'use-svelte-store';
import { info, isLoaded } from '../stores/documentationInfo';
import { View as Tags } from './tags';
import Paper from '@mui/material/Paper';
import { getReposInContainerRegistry, ContainerRegistryImages } from '../api/containerregistry';

type Props = {
    environment: string
    application: HttpResponseApplication
};

export const ContainerRegistryContainer: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const _props = props!;
    const application = _props.application;
    const applicationId = application.id;
    const environment = _props.environment;

    const [loaded, setLoaded] = useState(false);
    const [containerRegistryImages, setContainerRegistryImages] = useState({
        url: '',
        images: [],
    } as ContainerRegistryImages);

    useEffect(() => {
        Promise.all([
            getReposInContainerRegistry()
        ]).then(values => {
            setContainerRegistryImages(values[0]);
            setLoaded(true);
        });
    }, []);


    if (!loaded) {
        return null;
    }

    return (
        <>
            <div>
                <h1>Container Registry</h1>
            </div>
            <div>
                <Switch>
                    <Route exact path="/containerregistry/application/:applicationId/:environment/overview" >
                        <p>{containerRegistryImages.url}</p>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 480 }} aria-label="Docker images" size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
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
                    </Route>
                    <Route path="/containerregistry/application/:applicationId/:environment/overview/tags/:image+">
                        <Tags url={containerRegistryImages.url} />
                    </Route>
                </Switch>
            </div>
        </>
    );
};
