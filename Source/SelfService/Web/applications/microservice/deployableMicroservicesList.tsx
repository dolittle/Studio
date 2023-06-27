// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

// TODO validate the data
import React, { useEffect, useState } from 'react';

import { useNavigate, useLocation } from 'react-router';

import { Typography } from '@mui/material';

import { SimpleCardGrid, SimpleCardGridProps } from '@dolittle/design-system';

import { HttpResponseApplication } from '../../apis/solutions/application';

import { DeployMicroservice } from './deployMicroservice/deployMicroservice';

export type DeployableMicroservicesListProps = {
    environment: string;
    application: HttpResponseApplication;
};

export const DeployableMicroservicesList = ({ environment, application }: DeployableMicroservicesListProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);

    const deployableMicroservices: SimpleCardGridProps['simpleCardItems'] = [
        {
            title: 'Base (default)',
            description: 'Setup a container with the Dolittle runtime ready to consume your events.',
            secondaryButton: {
                label: 'Learn more',
                href: 'https://dolittle.io/docs/platform/requirements/',
                target: true,
                ariaLabel: 'Learn more about the base microservice.',
            },
            primaryButton: {
                label: 'Deploy',
                onClick: () => onCreate('dolittle-microservice'),
            },
        },
    ];

    const kindViaParams = () => {
        if (!searchParams.has('kind')) return '';
        const kind = searchParams.get('kind') as string;
        if (!kind || !deployableMicroservices.map(item => item.title).includes(kind)) return '';

        return kind;
    };

    const [microserviceTypeState, setMicroserviceTypeState] = useState(kindViaParams());

    useEffect(() => {
        setMicroserviceTypeState(kindViaParams());
    }, [kindViaParams()]);

    const onCreate = (kind: string) => {
        searchParams.set('kind', kind);
        navigate({ pathname: location.pathname, search: searchParams.toString() }, { replace: true });
        setMicroserviceTypeState(kind);
    };

    if (microserviceTypeState === '') {
        return (
            <>
                <Typography variant='h1' my={3}>Microservices</Typography>
                <SimpleCardGrid simpleCardItems={deployableMicroservices} />
            </>
        );
    }

    return (
        <>
            {microserviceTypeState === 'dolittle-microservice' && <DeployMicroservice application={application} environment={environment} />}
        </>
    );
};
