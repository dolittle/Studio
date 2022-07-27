// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { HttpResponseApplication } from '../../api/application';

import { useReadable } from 'use-svelte-store';
import { canEditMicroservices, microservices } from '../../stores/microservice';

import { Button, Typography } from '@mui/material';
import { RocketLaunch } from '@mui/icons-material';

import { EnhancedTableBody } from './enhancedTableBody';

const styles = {
    createMicroserviceBtn: {
        background: 'linear-Gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), #191A21',
        fontSize: '0.8125rem',
        fontWeight: '500',
        marginBlockStart: '1.0625rem',
        minBlockSize: '36px'
    },
};

type MicroservicesOverviewScreenProps = {
    environment: string
    application: HttpResponseApplication
};

export const MicroservicesOverviewScreen: React.FC<MicroservicesOverviewScreenProps> = (
    { environment, application }: MicroservicesOverviewScreenProps) => {

    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const $microservices = useReadable(microservices) as any;

    const { environments, id } = application;

    const canEdit = canEditMicroservices(environments, environment);

    const filteredMicroservices = $microservices.filter(microservice => microservice.environment === environment);
    const hasMicroservices = filteredMicroservices.length > 0;

    let tempEnvironments = environments.map(e => e.name);
    tempEnvironments = [...tempEnvironments, ...$microservices.map(item => item.environment)];
    const newEnvironments = [...new Set(tempEnvironments)];
    const hasEnvironments = newEnvironments.length > 0;

    const handleCreateMicroservice = () => {
        if (!canEdit) {
            enqueueSnackbar('Currently disabled, please reach out via freshdesk or teams.', { variant: 'error' });
            return;
        }

        const href = `/microservices/application/${id}/${environment}/create`;
        history.push(href);
    };

    const handleCreateEnvironment = () => {
        // TODO How to stop this if automation disabled, currently on the environment level
        const href = `/environment/application/${id}/create`;
        history.push(href);
    };

    return (
        <>
            {!hasEnvironments && (
                <Button onClick={handleCreateEnvironment}>Create New Environment</Button>
            )}

            <Typography variant='h1' my={2}>Microservices</Typography>

            {hasMicroservices && <EnhancedTableBody
                data={filteredMicroservices}
                applicationId={id}
                environment={environment}
            />}

            {hasEnvironments && (
                <Button
                    onClick={handleCreateMicroservice}
                    startIcon={<RocketLaunch />}
                    fullWidth
                    sx={styles.createMicroserviceBtn}
                >
                    Deploy New Microservice
                </Button>
            )}


            {!hasMicroservices && (
                <p>You currently do not have any microservices.</p>
            )}
        </>
    );
};
