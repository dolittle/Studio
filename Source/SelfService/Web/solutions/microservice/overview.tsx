// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReadable } from 'use-svelte-store';

import { Typography } from '@mui/material';

import { getPodStatus, HttpResponsePodStatus } from '../../api/api';
import { HttpResponseApplication } from '../../api/application';

import { microservices, MicroserviceStore } from '../stores/microservice';

import { MicroserviceView as BaseView } from './microserviceDetails/microserviceDetails';

type OverviewProps = {
    application: HttpResponseApplication;
    environment: string;
    microserviceId: string;
};

export const Overview = ({ application, microserviceId, environment }: OverviewProps) => {
    const $microservices = useReadable(microservices) as any;
    const navigate = useNavigate();

    const [loaded, setLoaded] = useState(false);

    // Want microservice name
    const [podsData, setPodsData] = useState({
        namespace: '',
        microservice: {
            name: '',
            id: ''
        },
        pods: []
    } as HttpResponsePodStatus);

    const currentMicroservice: MicroserviceStore = $microservices.find(ms => ms.id === microserviceId && ms.environment === environment);

    if (!currentMicroservice) {
        const href = `/microservices/application/${application.id}/${environment}/overview`;
        navigate(href);
        return null;
    }

    useEffect(() => {
        Promise.all([
            getPodStatus(application.id, environment, microserviceId)
        ]).then(values => {
            setPodsData(values[0]);
            setLoaded(true);
        });
    }, []);


    if (!loaded) {
        return null;
    }

    const subView = whichSubView(currentMicroservice);

    switch (subView) {
        case 'simple':
            return (
                <BaseView
                    application={application}
                    environment={environment}
                    microserviceId={microserviceId}
                    podsData={podsData}
                    currentMicroservice={currentMicroservice}
                />
            );
        default:
            return (
                <>
                    <Typography variant='h1' sx={{ my: 2 }}>Not supported</Typography>
                    <p>This is an error or our part</p>
                    <p>Kind is &quot;{currentMicroservice.kind}&quot;.</p>
                    <p>Subview is &quot;{subView}&quot;.</p>
                    <p>Microservice Id is {currentMicroservice.id}</p>
                </>
            );
    }
};


function whichSubView(currentMicroservice: MicroserviceStore): string {
    // Today we try and map subviews based on kind, its not perfect
    let kind = currentMicroservice.kind;

    if (kind === '') {
        kind = 'simple'; // TODO change
    }

    return kind;
};
