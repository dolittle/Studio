// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

// TODO validate the data
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

import { Grid, Typography } from '@mui/material';

import { HttpResponseApplication } from '../api/application';

import { SimpleCard } from './components/card';
import { CreateMicroservice } from './createMicroservice/createMicroservice';

const items = [
    {
        kind: 'dolittle-microservice',
        name: 'Base (default)',
        description: 'Setup a container with the Dolittle runtime ready to consume your events.'
    }
];

type DeployableMicroservicesListProps = {
    environment: string;
    application: HttpResponseApplication;
};

export const DeployableMicroservicesList = ({ environment, application }: DeployableMicroservicesListProps) => {
    const history = useHistory();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);

    const kindViaParams = (): string => {
        if (!searchParams.has('kind')) return '';
        const kind = searchParams.get('kind') as string;
        if (!kind || !items.map(e => e.kind).includes(kind)) return '';

        return kind;
    };

    const [microserviceTypeState, setMicroserviceTypeState] = useState(kindViaParams());

    useEffect(() => {
        setMicroserviceTypeState(kindViaParams());
    }, [kindViaParams()]);

    const onCreate = (kind: string) => {
        searchParams.set('kind', kind);
        history.replace({ pathname: location.pathname, search: searchParams.toString() });
        setMicroserviceTypeState(kind);
    };

    if (microserviceTypeState === '') {
        return (
            <>
                <Typography variant='h1' my={3}>Microservices</Typography>

                <Grid container rowSpacing={4} columnSpacing={4} sx={{ maxWidth: 920 }}>
                    {items.map(data => (
                        <Grid key={`pick-microservice-kind-${data.kind}`} item xs={12} md={6}>
                            <SimpleCard {...data} onCreate={onCreate} />
                        </Grid>
                    ))}
                </Grid>
            </>
        );
    }

    return (
        <>
            {microserviceTypeState === 'dolittle-microservice' && <CreateMicroservice application={application} environment={environment} />}
        </>
    );
};
