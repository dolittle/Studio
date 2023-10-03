// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router';

import { SimpleCardGrid, SimpleCardProps } from '@dolittle/design-system';

import { HttpResponseApplication } from '../../../apis/solutions/application';

import { PageTitle } from '../../../layout/PageTitle';
import { MicroserviceDeploy } from './MicroserviceDeploy';

type DeployableMicroservices = SimpleCardProps & {
    kind: string;
};

export type MicroserviceCreateIndexProps = {
    application: HttpResponseApplication;
};

export const MicroserviceCreateIndex = ({ application }: MicroserviceCreateIndexProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);

    const deployableMicroservices: DeployableMicroservices[] = [
        {
            kind: 'dolittle-microservice',
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
        if (!kind || !deployableMicroservices.map(item => item.kind).includes(kind)) return '';

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
                <PageTitle title='Create microservice' />
                <SimpleCardGrid simpleCardItems={deployableMicroservices} />
            </>
        );
    }

    return (
        <>
            {microserviceTypeState === 'dolittle-microservice' && <MicroserviceDeploy application={application} />}
        </>
    );
};
