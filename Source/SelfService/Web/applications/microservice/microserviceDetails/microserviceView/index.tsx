// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Tabs } from '@dolittle/design-system';

import { MicroserviceObject } from '../../../../apis/solutions/api';
import { HttpResponseApplication } from '../../../../apis/solutions/application';

import { PageTitle } from '../../../../layout/PageTitle';
import { ConfigurationIndex } from './configuration';
import { HealthStatusIndex } from './healthStatus';
import { useTerminalAvailable } from './terminal/useTerminal';
import { TerminalIndex } from './terminal';

import { getContainerStatus } from '../../../../utils/helpers';

export type MicroserviceViewIndexProps = {
    application: HttpResponseApplication;
    currentMicroservice: MicroserviceObject;
};

export const MicroserviceViewIndex = ({ application, currentMicroservice }: MicroserviceViewIndexProps) => {
    const getLastOpenTab = parseInt(sessionStorage.getItem('microservice-details-tabs') || '0');
    const podsStatuses = () => currentMicroservice.live?.pods?.flatMap(pod => pod.containers.map(container => container.state));
    const microserviceHealthStatus = getContainerStatus(podsStatuses());

    const tabs = [
        {
            label: 'Configuration',
            render: () => <ConfigurationIndex application={application} currentMicroservice={currentMicroservice} />
        },
        {
            label: 'Health Status',
            render: () => <HealthStatusIndex applicationId={application.id} currentMicroservice={currentMicroservice} />
        },
    ];

    const terminalAvailable = useTerminalAvailable(application.id, currentMicroservice.environment, currentMicroservice.id);
    if (terminalAvailable) {
        tabs.push(
            {
                label: 'Terminal',
                render: () => <TerminalIndex applicationId={application.id} environment={currentMicroservice.environment} microserviceId={currentMicroservice.id} />
            },
        );
    }

    return (
        <section>
            <PageTitle title={currentMicroservice.name} healthStatus={microserviceHealthStatus.status} healthStatusLabel={microserviceHealthStatus.label} />
            <Tabs id='microservice-details-tabs' selectedTab={getLastOpenTab} tabs={tabs} />
        </section>
    );
};
