// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { PrimaryButton } from '@fluentui/react/lib/Button';


import { getMicroservices, HttpResponseMicroservices, MicroserviceInfo, HttpResponseApplications2 } from '../api/api';

import '../microservice/microservice.scss';
import { ViewCard } from '../microservice/viewCard';

type Props = {
    application: HttpResponseApplications2
};


export const ApplicationOverviewScreen: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const _props = props!;
    const { applicationId, environment } = useParams() as any;
    const application = _props.application!;
    const canEdit = application.environments.some(info => info.name === environment && info.automationEnabled);

    const [environments, setEnvironments] = useState([] as string[]);
    const [currentEnvironment, setCurrentEnvironment] = useState(environment);
    const [hasEnvironments, setHasEnvironments] = useState(false);
    const [hasMicroservices, setHasMicroservices] = useState(false);

    const [currentMicroservices, setCurrentMicroservices] = useState([] as MicroserviceInfo[]);


    useEffect(() => {
        Promise.all([
            getMicroservices(applicationId)
        ]
        ).then((values) => {
            const applicationData = application;
            const microservicesData = values[0] as HttpResponseMicroservices;

            let tempEnvironments = applicationData.environments.map(e => e.name);
            tempEnvironments = [...tempEnvironments, ...microservicesData.microservices.map(item => item.environment)];
            const newEnviornments = [...new Set(tempEnvironments)];
            console.log(newEnviornments.length > 0);
            setHasEnvironments(newEnviornments.length > 0);
            setEnvironments(newEnviornments);

            const microservices = microservicesData.microservices.filter(microservice => microservice.environment === currentEnvironment);
            setHasMicroservices(microservices.length > 0);
            setCurrentMicroservices(microservices);
        });
    }, []);



    return (
        <>
            {!hasEnvironments && (
                <>
                    <PrimaryButton text="Create New Environment" onClick={(e => {
                        // TODO How to stop this if automation disabled, currently on the environment level
                        const href = `/application/${application.id}/environment/create`;
                        history.push(href);
                    })} />
                </>
            )}

            {hasEnvironments && (
                <>
                    <PrimaryButton text="Create New Microservice" onClick={(e => {
                        if (!canEdit) {
                            alert('Automation is disabled');
                            return;
                        }
                        const href = `/application/${application.id}/${currentEnvironment}/microservice/create`;
                        history.push(href);
                    })} />
                </>
            )}


            <h3>Microservices</h3>
            {hasMicroservices && (
                <div className="serv">
                    <ul>
                        {currentMicroservices.map((ms) => {
                            return <li key={ms.id}><ViewCard microservice={ms} applicationId={applicationId} environment={environment} canEdit={canEdit} /></li>;
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
