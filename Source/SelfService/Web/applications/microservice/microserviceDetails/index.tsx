// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useReadable } from 'use-svelte-store';

import { Typography } from '@mui/material';

import { HttpResponseApplication } from '../../../apis/solutions/application';

import { microservices } from '../../stores/microservice';

import { MicroserviceViewIndex } from './microserviceView';
import { MicroserviceObject } from '../../../apis/solutions/api';

export type MicroserviceDetailsIndexProps = {
    application: HttpResponseApplication;
};

export const MicroserviceDetailsIndex = ({ application }: MicroserviceDetailsIndexProps) => {
    const navigate = useNavigate();
    const $microservices = useReadable(microservices) as any;
    const { microserviceId, environment } = useParams() as any;

    const currentMicroservice: MicroserviceObject = $microservices.find((microservice: MicroserviceObject) =>
        microservice.id === microserviceId && microservice.environment === environment
    );

    if (!currentMicroservice) {
        const href = `/microservices/application/${application.id}/overview`;
        navigate(href);
        return null;
    }

    const subView = whichSubView(currentMicroservice);

    switch (subView) {
        case 'simple':
            return (
                <MicroserviceViewIndex application={application} currentMicroservice={currentMicroservice} />
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

function whichSubView(currentMicroservice: MicroserviceObject): string {
    // Today we try and map subviews based on kind, its not perfect
    let kind = currentMicroservice.kind;

    if (kind === '') {
        kind = 'simple'; // TODO change
    }

    return kind;
};
