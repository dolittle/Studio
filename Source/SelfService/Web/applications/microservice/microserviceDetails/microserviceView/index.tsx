// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Tabs } from '@dolittle/design-system';

import { MicroserviceStore } from '../../../stores/microservice';

import { getPodStatus, HttpResponsePodStatus } from '../../../../apis/solutions/api';
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
    currentMicroservice: MicroserviceStore;
};

export const MicroserviceViewIndex = ({ application, currentMicroservice }: MicroserviceViewIndexProps) => {
    const [podsData, setPodsData] = useState(initialPodsData);

    const applicationId = application.id;
    const microserviceId = currentMicroservice.id;
    const microserviceEnvironment = currentMicroservice.environment;
    const microserviceName = currentMicroservice.name;

    useEffect(() => {
        Promise.all([getPodStatus(applicationId, microserviceEnvironment, microserviceId)])
            .then(values => setPodsData(values[0]));
    }, []);

    const getLastOpenTab = parseInt(sessionStorage.getItem('microservice-details-tabs') || '0');
    const podsStatuses = () => podsData.pods.flatMap(pod => pod.containers.map(container => container.state));
    const microserviceHealthStatus = getContainerStatus(podsStatuses());

    const tabs = [
        {
            label: 'Configuration',
            render: () => <ConfigurationIndex application={application} currentMicroservice={currentMicroservice} />
        },
        {
            label: 'Health Status',
            render: () => <HealthStatusIndex applicationId={applicationId} currentMicroservice={currentMicroservice} data={podsData} />
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
