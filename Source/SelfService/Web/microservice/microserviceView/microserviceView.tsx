// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';

import { useReadable } from 'use-svelte-store';

import { microservices, MicroserviceStore, canEditMicroservice } from '../../stores/microservice';
import { Configuration } from './configuration';
import { HttpResponsePodStatus } from '../../api/api';
import { MicroserviceSimple } from '../../api/index';
import { HttpResponseApplication } from '../../api/application';

import { Box, Typography } from '@mui/material';

import { Tabs } from '@dolittle/design-system/atoms/Tabs/Tabs';

import { HealthStatus } from './healthStatus/healthStatus';
import { ContainerHealthStatus } from '../microserviceStatus';
import { Terminal } from './terminal';

type MicroserviceViewProps = {
    application: HttpResponseApplication;
    environment: string;
    microserviceId: string;
    podsData: HttpResponsePodStatus;
};

export const MicroserviceView = ({ application, microserviceId, environment, podsData }: MicroserviceViewProps) => {
    const $microservices = useReadable(microservices) as any;
    const history = useHistory();

    const getContainerStatuses = () => podsData.pods.flatMap(pod =>
        pod.containers.map(container => container.state));

    const applicationId = application.id;

    const currentMicroservice: MicroserviceStore = $microservices.find(ms => ms.id === microserviceId && ms.environment === environment);
    if (!currentMicroservice) {
        const href = `/microservices/application/${application.id}/${environment}/overview`;
        history.push(href);
        return null;
    }

    const canEdit = canEditMicroservice(application.environments, environment, currentMicroservice.id);

    let ms = {} as MicroserviceSimple;
    let hasEditData = false;
    if (canEdit) {
        hasEditData = true;
        ms = currentMicroservice.edit;
    }

    if (!hasEditData) {
        // Can I not move this to the store?
        const headImage = currentMicroservice.live.images.find(img => img.name === 'head')?.image
            || 'N/A';
        const runtimeImage = currentMicroservice.live.images.find(img => img.name === 'runtime')?.image
            || 'N/A';

        const headCommand = {
            command: [],
            args: []
        };

        const environmentInfo = application.environments.find(_environment => _environment.name === environment)!;
        // TODO currently we don't use the ms.extra.ingress in the view
        // Look to "liveIngressView" for how we "set" the data to uniq paths
        ms = {
            dolittle: {
                applicationId,
                customerId: application.customerId,
                microserviceId,
            },
            name: currentMicroservice.name,
            kind: 'unknown',
            environment,
            extra: {
                ingress: {
                    path: '',
                    pathType: ''
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

    const msName = currentMicroservice.name;

    return (
        <>
            <Box sx={{ display: 'flex', mb: 3.25 }}>
                <Typography variant="h1">{msName}</Typography>
                <ContainerHealthStatus status={getContainerStatuses()} />
            </Box>

            <Tabs
                tabs={[
                    {
                        label: 'Configuration',
                        render: () => <Configuration
                            applicationId={applicationId}
                            environment={environment}
                            microserviceId={microserviceId}
                            msName={msName}
                            ingressUrls={currentMicroservice.live.ingressUrls}
                            ingressPaths={currentMicroservice.live.ingressPaths}
                            ms={ms}
                            onClick={async () => {
                                const href = `/microservices/application/${applicationId}/${environment}/view/${microserviceId}/environment-variables`;
                                history.push(href);
                            }}
                        />
                    },
                    {
                        label: 'Health Status',
                        render: () => <HealthStatus
                            applicationId={applicationId}
                            status="TODO"
                            environment={environment}
                            microserviceId={microserviceId}
                            data={podsData}
                        />
                    },
                    {
                        label: 'Terminal',
                        render: () => <Terminal
                            applicationId={applicationId}
                            environment={environment}
                            microserviceId={microserviceId}
                        />
                    },
                ]}
            />
        </>
    );
};
