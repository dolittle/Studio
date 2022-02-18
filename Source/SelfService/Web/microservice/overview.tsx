// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { PrimaryButton } from '@fluentui/react/lib/Button';


import { HttpResponseApplication } from '../api/application';

import '../microservice/microservice.scss';
import { ViewCard } from './viewCard';

import { useReadable } from 'use-svelte-store';
import { canDeleteMicroservice, canEditMicroservices, microservices } from '../stores/microservice';

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

    return (
        <>
            {!hasEnvironments && (
                <>
                    <PrimaryButton text="Create New Environment" onClick={(e => {
                        // TODO How to stop this if automation disabled, currently on the environment level
                        const href = `/environment/application/${application.id}/create`;
                        history.push(href);
                    })} />
                </>
            )}

            {hasEnvironments && (
                <>
                    <PrimaryButton text="Create New Microservice" onClick={(e => {
                        if (!canEdit) {
                            enqueueSnackbar('Currently disabled, please reach out via freshdesk or teams.', { variant: 'error' });
                            return;
                        }
                        const href = `/microservices/application/${application.id}/${environment}/create`;
                        history.push(href);
                    })} />
                </>
            )}


            <h3>Microservices</h3>
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
