// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Tabs } from '@dolittle/design-system';

import { getPodStatus, HttpResponsePodStatus, MicroserviceObject } from '../../../../apis/solutions/api';
import { HttpResponseApplication } from '../../../../apis/solutions/application';

import { PageTitle } from '../../../../layout/PageTitle';
import { ConfigurationIndex } from './configuration';
import { HealthStatusIndex } from './healthStatus';
import { useTerminalAvailable } from './terminal/useTerminal';
import { TerminalIndex } from './terminal';

import { getContainerStatus } from '../../../../utils/helpers';

const initialPodsData: HttpResponsePodStatus = {
    namespace: '',
    microservice: {
        name: '',
        id: '',
    },
    pods: [],
};

export type MicroserviceViewIndexProps = {
    application: HttpResponseApplication;
    currentMicroservice: MicroserviceObject;
};

export const MicroserviceViewIndex = ({ application, currentMicroservice }: MicroserviceViewIndexProps) => {

    const applicationId = application.id;
    const microserviceId = currentMicroservice.id;
    const microserviceEnvironment = currentMicroservice.environment;
    const microserviceName = currentMicroservice.name;

    const getLastOpenTab = parseInt(sessionStorage.getItem('microservice-details-tabs') || '0');
    const podsStatuses = () => currentMicroservice.live.pods.flatMap(pod => pod.containers.map(container => container.state));
    const microserviceHealthStatus = getContainerStatus(podsStatuses());

    const tabs = [
        {
            label: 'Configuration',
            render: () => <ConfigurationIndex application={application} currentMicroservice={currentMicroservice} />
        },
        {
            label: 'Health Status',
            render: () => <HealthStatusIndex applicationId={applicationId} currentMicroservice={currentMicroservice} />
        },
    ];

    const terminalAvailable = useTerminalAvailable(applicationId, microserviceEnvironment, microserviceId);
    if (terminalAvailable) {
        tabs.push(
            {
                label: 'Terminal',
                render: () => <TerminalIndex applicationId={applicationId} environment={microserviceEnvironment} microserviceId={microserviceId} />
            },
        );
    }

    return (
        <section>
            <PageTitle title={microserviceName} healthStatus={microserviceHealthStatus.status} healthStatusLabel={microserviceHealthStatus.label} />
            <Tabs id='microservice-details-tabs' selectedTab={getLastOpenTab} tabs={tabs} />
        </section>
    );
};
