// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { HttpResponseApplication } from '../api/application';

import '../microservice/microservice.scss';
import { ViewCard } from './viewCard';

import { useReadable } from 'use-svelte-store';
import { canDeleteMicroservice, canEditMicroservices, microservices } from '../stores/microservice';
import { Button, Typography } from '@mui/material';

type Props = {
    environment: string
    application: HttpResponseApplication
};



export const MicroservicesOverviewScreen: React.FunctionComponent<Props> = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const $microservices = useReadable(microservices) as any;

    const history = useHistory();
    const _props = props!;
    const environment = _props.environment;
    const applicationId = _props.application.id;

    const application = _props.application!;
    const canEdit = canEditMicroservices(application.environments, environment);

    const filteredMicroservices = $microservices.filter(microservice => microservice.environment === environment);
    const hasMicroservices = filteredMicroservices.length > 0;

    let tempEnvironments = application.environments.map(e => e.name);
    tempEnvironments = [...tempEnvironments, ...$microservices.map(item => item.environment)];
    const newEnvironments = [...new Set(tempEnvironments)];
    const hasEnvironments = newEnvironments.length > 0;

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
            {!hasEnvironments && (
                <Button onClick={handleCreateEnvironment}>Create New Environment</Button>
            )}

            {hasEnvironments && (
                <Button onClick={handleCreateMicroservice}>Create New Microservice</Button>
            )}


            <Typography variant='h1' my={2}>Microservices</Typography>
            {hasMicroservices && (
                <div className="serv">
                    <ul>
                        {filteredMicroservices.map((ms) => {
                            const canDelete = canDeleteMicroservice(application.environments, environment, ms.id);

                            return <li key={`${environment}-${ms.id}`}><ViewCard
                                microserviceId={ms.id}
                                microserviceName={ms.name}
                                microserviceKind={ms.kind}
                                applicationId={applicationId}
                                environment={environment}
                                canDelete={canDelete}
                            /></li>;
                        })}
                    </ul>
                </div>
            )}

            {!hasMicroservices && (
                <p>You currently do not have any microservices.</p>
            )}
        </>
    );
};
