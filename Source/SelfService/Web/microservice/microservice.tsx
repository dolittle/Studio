// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { LoadingSpinner } from '@dolittle/design-system/atoms/LoadingSpinner/LoadingSpinner';
import { Button } from '@dolittle/design-system/atoms/Button';

import { HttpResponseApplication } from '../api/application';

import { useReadable } from 'use-svelte-store';
import { canEditMicroservices, microservices } from '../stores/microservice';

import { Paper, Typography } from '@mui/material';
import { RocketLaunch } from '@mui/icons-material';

import { NoMicroservices } from './noMicroservices';
import { DataTable, MicroserviceObject } from './microserviceDataTable';

type MicroservicesOverviewScreenProps = {
    environment: string;
    application: HttpResponseApplication;
};

export const MicroservicesOverviewScreen = ({ environment, application }: MicroservicesOverviewScreenProps) => {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const $microservices = useReadable(microservices) as MicroserviceObject[];

    const [hasMicroservices, setHasMicroservices] = useState(false);
    const [loading, setLoading] = useState(true);

    let tempEnvironments = application.environments.map(e => e.name);
    tempEnvironments = [...tempEnvironments, ...$microservices.map(item => item.environment)];

    const canEdit = canEditMicroservices(application.environments, environment);

    const newEnvironments = [...new Set(tempEnvironments)];
    const hasEnvironments = newEnvironments.length > 0;

    const filteredMicroservices = $microservices.filter(microservice => microservice.environment === environment);

    useEffect(() => {
        setHasMicroservices(filteredMicroservices.length > 0);
        setLoading(false);
    }, []);

    const handleCreateMicroservice = () => {
        if (!canEdit) {
            enqueueSnackbar('Currently disabled, please reach out via freshdesk or teams.', { variant: 'error' });
            return;
        }

        sessionStorage.setItem('microserviceCreate', 'true');
        const href = `/microservices/application/${application.id}/${environment}/create`;
        history.push(href);
    };

    const handleCreateEnvironment = () => {
        // TODO How to stop this if automation disabled, currently on the environment level
        const href = `/environment/application/${application.id}/create`;
        history.push(href);
    };

    if (loading) {
        return <LoadingSpinner />;
    };

    return (
        <>
            {!hasEnvironments &&
                <Button
                    variant='text'
                    label='Create New Environment'
                    onClick={handleCreateEnvironment}
                />
            }

            <Typography variant='h1' sx={{ my: 2 }}>Microservices</Typography>

            {hasMicroservices ?
                <DataTable application={application} environment={environment} microservices={filteredMicroservices} /> :
                <NoMicroservices onCreate={handleCreateMicroservice} />
            }

            {hasEnvironments && hasMicroservices &&
                <Paper sx={{ mt: 2.125 }}>
                    <Button
                        variant='text'
                        label='Deploy New Microservice'
                        startWithIcon={<RocketLaunch />}
                        fullWidth
                        onClick={() => handleCreateMicroservice()}
                    />
                </Paper>
            }
        </>
    );
};
