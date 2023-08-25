// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import { StatusIndicator, Tabs } from '@dolittle/design-system';

import { MicroserviceStore, canEditMicroservice } from '../../stores/microservice';

import { MicroserviceSimple } from '../../../apis/solutions/index';
import { getPodStatus, HttpResponsePodStatus } from '../../../apis/solutions/api';
import { HttpResponseApplication } from '../../../apis/solutions/application';

import { ConfigurationFilesSection } from './configurationFilesSection/configurationFilesSection';
import { HealthStatus } from './healthStatus/healthStatus';
import { useTerminalAvailable } from './terminal/useTerminal';
import { TerminalView } from './terminal/terminalView';

import { getContainerStatus } from '../../../utils/helpers';

const initialPodsData: HttpResponsePodStatus = {
    namespace: '',
    microservice: {
        name: '',
        id: '',
    },
    pods: [],
};

export type MicroserviceDetailsProps = {
    application: HttpResponseApplication;
    currentMicroservice: MicroserviceStore;
};

export const MicroserviceDetails = ({ application, currentMicroservice }: MicroserviceDetailsProps) => {
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

    // What is the purpose of this??
    const canEdit = canEditMicroservice(application.environments, microserviceEnvironment, microserviceId);
    let ms = {} as MicroserviceSimple;
    let hasEditData = false;
    if (canEdit) {
        hasEditData = true;
        ms = currentMicroservice.edit;
    }

    // Does this ever run??
    if (!hasEditData) {
        // Can I not move this to the store?
        const headImage = currentMicroservice.live.images.find(img => img.name === 'head')?.image
            || 'N/A';
        const runtimeImage = currentMicroservice.live.images.find(img => img.name === 'runtime')?.image
            || 'N/A';

        const headCommand = {
            command: [],
            args: [],
        };

        const environmentInfo = application.environments.find(environment => environment.name === microserviceEnvironment)!;

        // TODO currently we don't use the ms.extra.ingress in the view
        // Look to "liveIngressView" for how we "set" the data to uniq paths
        ms = {
            dolittle: {
                applicationId,
                customerId: application.customerId,
                microserviceId,
            },
            name: microserviceName,
            kind: 'unknown',
            environment: microserviceEnvironment,
            extra: {
                ingress: {
                    path: '',
                    pathType: '',
                },
                headPort: 80,
                isPublic: true,
                headImage,
                runtimeImage,
                headCommand,
                connections: environmentInfo.connections,
            },
        };
    }

    const tabs = [
        {
            label: 'Configuration',
            render: () => <ConfigurationFilesSection application={application} applicationId={applicationId} currentMicroservice={currentMicroservice} />
        },
        {
            label: 'Health Status',
            render: () => <HealthStatus applicationId={applicationId} currentMicroservice={currentMicroservice} data={podsData} />
        },
    ];

    const terminalAvailable = useTerminalAvailable(applicationId, microserviceEnvironment, microserviceId);
    if (terminalAvailable) {
        tabs.push(
            {
                label: 'Terminal',
                render: () => <TerminalView applicationId={applicationId} environment={microserviceEnvironment} microserviceId={microserviceId} />
            },
        );
    }

    return (
        <Box sx={{ my: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3.25 }}>
                <Typography variant='h1' sx={{ mr: 3 }}>{microserviceName}</Typography>
                <StatusIndicator variantFilled status={microserviceHealthStatus.status} label={microserviceHealthStatus.label} />
            </Box>

            <Tabs id='microservice-details-tabs' selectedTab={getLastOpenTab} tabs={tabs} />
        </Box>
    );
};
