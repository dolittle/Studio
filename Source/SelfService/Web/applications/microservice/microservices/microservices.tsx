// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useHref, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { MicroserviceObject } from '../../../apis/solutions/api';
import { HttpResponseApplication } from '../../../apis/solutions/application';

import { useReadable } from 'use-svelte-store';
import { canEditMicroservices, microservices } from '../../stores/microservice';

import { Typography } from '@mui/material';

import { Button } from '@dolittle/design-system';

import { NoMicroservices } from './noMicroservices';
import { MicroservicesDataGrid } from './microservicesDataGrid';

export type MicroserviceProps = {
    application: HttpResponseApplication;
};

export const Microservice = ({ application }: MicroserviceProps) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const $microservices = useReadable(microservices) as MicroserviceObject[];

    // TODO: Refactor. Use createMicroserviceHref?
    const handleCreateMicroservice = () => {
        // TODO ENV: How to handle this?
        //const canEdit = canEditMicroservices(application.environments, environment);
        // if (!canEdit) {
        //     enqueueSnackbar('Currently disabled. Please reach out via freshdesk or teams.', { variant: 'error' });
        //     return;
        // }

        const href = `/microservices/application/${application.id}/create`;
        navigate(href);
    };

    const createMicroserviceHref = useHref(`/microservices/application/${application.id}/create`);

    return (
        <>
            <Typography variant='h1' sx={{ my: 2 }}>Microservices</Typography>

            {$microservices.length > 0 ? (
                <>
                    <MicroservicesDataGrid application={application} microservices={$microservices} />
                    <Button label='Deploy New Microservice' variant='fullwidth' startWithIcon='RocketLaunch' href={createMicroserviceHref} sx={{ mt: 2.125 }} />
                </>
            ) : (
                <NoMicroservices onCreate={handleCreateMicroservice} />
            )}
        </>
    );
};
