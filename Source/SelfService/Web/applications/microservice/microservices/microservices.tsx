// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useHref, useNavigate } from 'react-router-dom';

import { MicroserviceObject } from '../../../apis/solutions/api';
import { HttpResponseApplication } from '../../../apis/solutions/application';

import { useReadable } from 'use-svelte-store';
import { microservices } from '../../stores/microservice';

import { Typography } from '@mui/material';

import { Button } from '@dolittle/design-system';

import { NoMicroservices } from './noMicroservices';
import { MicroservicesDataGrid } from './microservicesDataGrid';

export type MicroserviceProps = {
    application: HttpResponseApplication;
};

export const Microservice = ({ application }: MicroserviceProps) => {
    const navigate = useNavigate();
    const $microservices = useReadable(microservices) as MicroserviceObject[];

    // TODO: Make this a button with 'href'.
    const href = `/microservices/application/${application.id}/create`;
    const createMicroserviceHref = useHref(href);

    return (
        <>
            <Typography variant='h1' sx={{ my: 3 }}>Microservices</Typography>

            {$microservices.length > 0 ? (
                <>
                    <MicroservicesDataGrid application={application} microservices={$microservices} />
                    <Button label='Deploy New Microservice' variant='fullwidth' startWithIcon='RocketLaunch' href={createMicroserviceHref} sx={{ mt: 2.125 }} />
                </>
            ) : (
                <NoMicroservices onCreate={() => navigate(href)} />
            )}
        </>
    );
};
