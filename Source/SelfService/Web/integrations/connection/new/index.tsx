// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

import { Box, Typography } from '@mui/material';

import { AccordionList, AccordionListProps, Form } from '@dolittle/design-system';

import { CACHE_KEYS } from '../../../apis/integrations/CacheKeys';
import { useConnectionsIdGet, useConnectionsIdNamePost } from '../../../apis/integrations/connectionsApi.hooks';
import { useConnectionsIdDeployCloudPost, useConnectionsIdDeployOnPremisesPost } from '../../../apis/integrations/deploymentApi.hooks';
import { useConnectionsIdConfigurationMdpPost, useConnectionsIdConfigurationIonPost } from '../../../apis/integrations/connectionConfigurationApi.hooks';

import { useConnectionId } from '../../routes.hooks';

import { Page } from '../../../components/layout/page';
import { MainM3ConnectionInfo } from './components/MainM3ConnectionInfo';
import { ConnectorBundleConfiguration } from './components/ConnectorBundleConfiguration';
import { MetadataPublisherCredentials } from './components/MetadataPublisherCredentials';
import { IonServiceAccountCredentials } from './components/IonServiceAccountCredentials';
import { ActionButtons } from './components/ActionButtons';

const accordionListProps: AccordionListProps = {
    singleExpandMode: true,
    items: [
        {
            id: 'hostConnectorBundle',
            title: 'Host Your Connector Bundle',
            children: <ConnectorBundleConfiguration />,
            sx: { mt: 8 },
        },
        {
            id: 'metadataPublisherCredentials',
            title: 'Metadata Publisher Credentials',
            children: <MetadataPublisherCredentials />,
            sx: { mt: 8 },
        },
        {
            id: 'ionCredentials',
            title: 'ION Service Account Credentials',
            children: <IonServiceAccountCredentials />,
            sx: { mt: 8 },
        },
    ],
};

export type M3ConnectionParameters = {
    connectorName: string;
    selectHosting: string;
    metadataPublisherUrl: string;
    metadataPublisherPassword: string;
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

    if (query.isLoading) return <>Loading</>;
    if (!query.data?.value || !connectionId) return null;

    const connection = query.data.value;
    const links = query.data.links;

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
