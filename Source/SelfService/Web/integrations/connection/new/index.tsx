// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';

import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

import { Box, Typography } from '@mui/material';

import { AccordionList, AccordionListProps, Form, StatusIndicatorProps } from '@dolittle/design-system';

import { CACHE_KEYS } from '../../../apis/integrations/CacheKeys';
import { useConnectionsIdGet, useConnectionsIdNamePost } from '../../../apis/integrations/connectionsApi.hooks';
import { useConnectionsIdDeployCloudPost, useConnectionsIdDeployOnPremisesPost } from '../../../apis/integrations/deploymentApi.hooks';
import { useConnectionsIdConfigurationMdpPost, useConnectionsIdConfigurationIonPost } from '../../../apis/integrations/connectionConfigurationApi.hooks';
import { ConnectionStatus, RemoteServiceStatus } from '../../../apis/integrations/generated';

import { useConnectionId } from '../../routes.hooks';

import { Page } from '../../../components/layout/page';
import { MainM3ConnectionInfo } from './components/MainM3ConnectionInfo';
import { ConnectorBundleConfiguration } from './components/ConnectorBundleConfiguration';
import { MetadataPublisherCredentials } from './components/MetadataPublisherCredentials';
import { IonServiceAccountCredentials } from './components/IonServiceAccountCredentials';
import { ActionButtons } from './components/ActionButtons';


export type M3ConnectionParameters = {
    connectorName: string;
    selectHosting: string;
    metadataPublisherUrl: string;
    metadataPublisherPassword: string;
};

const resolveConnectorBundleStatus = (connectionStatus?: ConnectionStatus): [StatusIndicatorProps['status'], StatusIndicatorProps['label']] => {
    switch (connectionStatus?.name) {
        case 'Pending':
        case 'Connected':
        case 'Failing':
        case 'Deleted':
            return ['success', 'Connected'];
        case 'Registered':
        default:
            return ['waiting', 'Waiting for access'];
    }
};

const resolveServiceCredentialsStatus = (serviceStatus?: RemoteServiceStatus | undefined): [StatusIndicatorProps['status'], StatusIndicatorProps['label']] => {
    switch (serviceStatus?.name) {
        case 'Unresponsive':
        case 'Inactive':
        case 'Disconnected':
        case 'ServiceFailing':
            return ['error', 'Failed'];
        case 'Active':
            return ['success', 'Connected'];
        case 'Configured':
            return ['waiting', 'Configured'];
        case 'Alive':
        case 'Undeployed':
        case 'DeploymentChosen':
        default:
            return ['waiting', 'Waiting for credential verification'];
    }
};

export const NewConnectionView = () => {
    const { enqueueSnackbar } = useSnackbar();

    const connectionId = useConnectionId();
    const queryClient = useQueryClient();
    const query = useConnectionsIdGet({ id: connectionId || '' });

    const nameMutation = useConnectionsIdNamePost();
    const onPremisesConfigurationMutation = useConnectionsIdDeployOnPremisesPost();
    const onCloudConfigurationMutation = useConnectionsIdDeployCloudPost();
    const ionConfigurationMutation = useConnectionsIdConfigurationIonPost();
    const mdpConfigurationMutation = useConnectionsIdConfigurationMdpPost();
    const connection = query.data?.value;

    const accordionListProps: AccordionListProps = useMemo(() => {
        const connectorBundleStatus = resolveConnectorBundleStatus(connection?.status);
        const metadataPublisherCredentialsStatus = resolveServiceCredentialsStatus(connection?.mdpStatus);
        const iONServiceAccountCredentialsStatus = resolveServiceCredentialsStatus(connection?.ionStatus);

        return {
            singleExpandMode: true,
            items: [
                {
                    id: 'hostConnectorBundle',
                    title: 'Host Your Connector Bundle',
                    children: <ConnectorBundleConfiguration />,
                    progressStatus: connectorBundleStatus[0],
                    progressLabel: connectorBundleStatus[1],
                    sx: { mt: 8 },
                },
                {
                    id: 'metadataPublisherCredentials',
                    title: 'Metadata Publisher Credentials',
                    children: <MetadataPublisherCredentials />,
                    progressStatus: metadataPublisherCredentialsStatus[0],
                    progressLabel: metadataPublisherCredentialsStatus[1],
                    sx: { mt: 8 },
                },
                {
                    id: 'ionCredentials',
                    title: 'ION Service Account Credentials',
                    children: <IonServiceAccountCredentials />,
                    progressStatus: iONServiceAccountCredentialsStatus[0],
                    progressLabel: iONServiceAccountCredentialsStatus[1],
                    sx: { mt: 8 },
                },
            ],
        };
    }, [connection?.status, connection?.ionStatus, connection?.mdpStatus]);

    if (query.isLoading) return <>Loading</>;
    if (!connection || !connectionId) return null;

    const links = query.data?.links || [];

    const deploymentType = connection.chosenEnvironment?.value;
    const hasSelectedDeploymentType = deploymentType?.toLowerCase() !== 'unknown';
    const metadataPublisherUrl = connection._configuration?.mdp?.url;
    const metadataPublisherPassword = connection._configuration?.mdp?.password;

    const handleSuccessfulSave = (message: string) => {
        enqueueSnackbar(message);
        queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.Connection_GET, connectionId] });
    };

    const handleM3ConnectionSave = (values: M3ConnectionParameters) => {
        if (connection.name !== values.connectorName) {
            nameMutation.mutate(
                {
                    id: connectionId,
                    body: values.connectorName,
                },
                {
                    onSuccess: () => { handleSuccessfulSave('Saved Name'); },
                    onError: () => console.log('Error'),
                },
            );
        }

        if (!hasSelectedDeploymentType && values.selectHosting) {
            if (values.selectHosting === 'On premises') {
                onPremisesConfigurationMutation.mutate(
                    {
                        id: connectionId,
                    },
                    {
                        onSuccess: () => { handleSuccessfulSave('Saved Hosting Type'); },
                        onError: () => console.log('Error'),
                    },
                );
            }

            if (values.selectHosting === 'Cloud') {
                onCloudConfigurationMutation.mutate(
                    {
                        id: connectionId,
                    },
                    {
                        onSuccess: () => { handleSuccessfulSave('Saved Hosting Type'); },
                        onError: () => console.log('Error'),
                    },
                );
            }
        }

        if (metadataPublisherUrl !== values.metadataPublisherUrl || metadataPublisherPassword !== values.metadataPublisherPassword) {
            mdpConfigurationMutation.mutate(
                {
                    id: connectionId,
                    metadataPublisherConfigRequest: {
                        url: values.metadataPublisherUrl,
                        password: values.metadataPublisherPassword,
                    },
                },
                {
                    onSuccess: () => { handleSuccessfulSave('Saved MDP Configuration'); },
                    onError: () => console.log('Error'),
                },
            );
        }
    };

    return (
        <Page title='New M3 Connection'>
            <Box sx={{ maxWidth: 814, mt: 7, ml: 1 }}>
                <Typography variant='subtitle1'>{`Let's get your M3 connector up and running...`}</Typography>

                <Form<M3ConnectionParameters>
                    initialValues={{
                        connectorName: connection.name || '',
                        selectHosting: hasSelectedDeploymentType ? deploymentType || '' : '',
                        metadataPublisherUrl: metadataPublisherUrl || '',
                        metadataPublisherPassword: metadataPublisherPassword || '',
                    }}
                    onSubmit={handleM3ConnectionSave}
                    sx={{ ml: 3 }}
                >
                    <MainM3ConnectionInfo hasSelectedDeploymentType={hasSelectedDeploymentType} connectionIdLinks={links} />

                    <AccordionList  {...accordionListProps} />

                    <ActionButtons />
                </Form>
            </Box>
        </Page>
    );
};
