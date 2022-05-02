// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HttpResponseApplication } from '../api/application';
import {
    Table, TableContainer, TableHead,
    TableRow, TableCell, TableBody
} from '@mui/material';

//import './documentation.scss';

import { useReadable } from 'use-svelte-store';
import { info, load, isLoaded } from '../stores/documentationInfo';
import Paper from '@mui/material/Paper';

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

    const $info = useReadable(info) as any;
    const $isLoaded = useReadable(isLoaded) as boolean;

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!$isLoaded) {
            Promise.all([
                load(applicationId),
            ]).then(values => {
                setLoaded(true);
            });
        } else {
            setLoaded(true);
        }
    }, []);

    if (!loaded) {
        return null;
    }

    if ($info.applicationId === '') {
        return null;
    }

    const rows = [
        { name: 'customer/application/productstructureextractor' },
        { name: 'customer/application/excelsior' },
        { name: 'customer/application/flattenedjsonproducer' },
        { name: 'customer/application/ignite' },
        { name: 'customer/application/productstructureextractor-jobs' },
        { name: 'customer/application/supplier' },
        { name: 'customer/application/webhooksingestor' }
    ];

    return (
        <>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 480 }} aria-label="Docker images">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};
