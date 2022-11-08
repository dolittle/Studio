// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useReadable } from 'use-svelte-store';
import { useSnackbar } from 'notistack';

import { microservices, MicroserviceStore, canEditMicroservice } from '../../stores/microservice';
import { HttpResponsePodStatus } from '../../api/api';
import { MicroserviceSimple } from '../../api/index';
import { HttpResponseApplication } from '../../api/application';

import { Box, Typography } from '@mui/material';

import { Tabs } from '@dolittle/design-system/atoms/Tabs/Tabs';
import { ConfirmDialog } from '@dolittle/design-system/atoms/ConfirmDialog/ConfirmDialog';

import { Configuration } from './configuration/configuration';
import { HealthStatus } from './healthStatus/healthStatus';
import { ContainerHealthStatus } from '../microserviceStatus';
import { useTerminalAvailable } from './terminal/useTerminal';
import { View as Terminal } from './terminal/View';

import { microserviceRestart } from './helpers';

type MicroserviceViewProps = {
    application: HttpResponseApplication;
    environment: string;
    microserviceId: string;
    podsData: HttpResponsePodStatus;
};

export const MicroserviceView = ({ application, microserviceId, environment, podsData }: MicroserviceViewProps) => {
    const $microservices = useReadable(microservices) as any;
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const [restartDialogIsOpen, setRestartDialogIsOpen] = useState(false);

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

    // What is the purpose of this??
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

    const handleEnvironmentClick = async () => {
        const href = `/microservices/application/${applicationId}/${environment}/view/${microserviceId}/environment-variables`;
        history.push(href);
    };

    const handleMicroserviceRestart = async () => {
        await microserviceRestart({ applicationId, environment, microserviceId, enqueueSnackbar });
    };

    const tabs = [
        {
            label: 'Configuration',
            render: () => <Configuration
                application={application}
                applicationId={applicationId}
                environment={environment}
                microserviceId={microserviceId}
                currentMicroservice={currentMicroservice}
                onClick={handleEnvironmentClick}
                resetDialogOpen={() => setRestartDialogIsOpen(true)}
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
                resetDialogOpen={() => setRestartDialogIsOpen(true)}
            />
        }
    ];

    const terminalAvailable = useTerminalAvailable(applicationId, environment, microserviceId);
    if (terminalAvailable) {
        tabs.push(
            {
                label: 'Terminal',
                render: () => <Terminal
                    applicationId={applicationId}
                    environment={environment}
                    microserviceId={microserviceId}
                />
            },
        );
    }

    return (
        <>
            <ConfirmDialog
                id='restart-microservice-dialog'
                open={restartDialogIsOpen}
                title='Restart microservice?'
                description='This action cannot be undone. Click restart if you would like to restart the mircroservice.'
                cancelText='Cancel'
                confirmText='Restart'
                handleCancel={() => setRestartDialogIsOpen(false)}
                handleConfirm={handleMicroserviceRestart}
            />

            <Box sx={{ display: 'flex', mb: 3.25 }}>
                <Typography variant="h1">{currentMicroservice.name}</Typography>
                <ContainerHealthStatus status={getContainerStatuses()} />
            </Box>

            <Tabs tabs={tabs} />
        </>
    );
};
