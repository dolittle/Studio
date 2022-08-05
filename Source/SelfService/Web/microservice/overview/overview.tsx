// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { HttpResponseApplication } from '../../api/application';

import { useReadable } from 'use-svelte-store';
import { canEditMicroservices, microservices } from '../../stores/microservice';

import { Button, Typography } from '@mui/material';

import { NoMicroservices } from '../noMicroservices';
import { DataTable, MicroserviceObject } from '../dataTable';
import { CreateButton } from '../createButton';

type MicroservicesOverviewScreenProps = {
    environment: string
    application: HttpResponseApplication
};

export const MicroservicesOverviewScreen: React.FC<MicroservicesOverviewScreenProps> = (
    { environment, application }: MicroservicesOverviewScreenProps) => {

    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const $microservices = useReadable(microservices) as MicroserviceObject[];
    const [hasMicroservices, setHasMicroservices] = useState(false);

    let tempEnvironments = application.environments.map(e => e.name);
    tempEnvironments = [...tempEnvironments, ...$microservices.map(item => item.environment)];

    const canEdit = canEditMicroservices(application.environments, environment);

    const newEnvironments = [...new Set(tempEnvironments)];
    const hasEnvironments = newEnvironments.length > 0;

    const filteredMicroservices = $microservices.filter(microservice => microservice.environment === environment);

    useEffect(() => {
        setHasMicroservices(filteredMicroservices.length > 0);
    }, []);

    const handleCreateMicroservice = () => {
        if (!canEdit) {
            enqueueSnackbar('Currently disabled, please reach out via freshdesk or teams.', { variant: 'error' });
            return;
        }

        const href = `/microservices/application/${application.id}/${environment}/create`;
        history.push(href);
    };

    const handleCreateEnvironment = () => {
        // TODO How to stop this if automation disabled, currently on the environment level
        const href = `/environment/application/${application.id}/create`;
        history.push(href);
    };

    return (
        <>
            {!hasEnvironments && <Button onClick={handleCreateEnvironment}>Create New Environment</Button>}

            <Typography variant='h1' my={2}>Microservices</Typography>

            {hasMicroservices && <DataTable application={application} environment={environment} microservices={filteredMicroservices} />}

            {hasEnvironments && hasMicroservices && <CreateButton handleClick={handleCreateMicroservice} />}

            {!hasMicroservices && <NoMicroservices onCreate={handleCreateMicroservice} />}
        </>
    );
};
