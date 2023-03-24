// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useReducer } from 'react';
import { useSnackbar } from 'notistack';

import { Box, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { AccordionList, AccordionListProps, Button, Form } from '@dolittle/design-system';

//import { CACHE_KEYS } from '../../../apis/integrations/CacheKeys';
import { CACHE_KEYS } from '../../../apis/integrations/CacheKeys';
import { useConnectionsIdGet, useConnectionsIdNamePost } from '../../../apis/integrations/connectionsApi.hooks';
import { useConnectionsIdConfigurationMdpPost, useConnectionsIdConfigurationIonPost } from '../../../apis/integrations/connectionConfigurationApi.hooks';
import { useConnectionsIdDeployCloudPost, useConnectionsIdDeployOnPremisesPost } from '../../../apis/integrations/deploymentApi.hooks';

import { Page } from '../../../components/layout/page';
import { useConnectionId } from '../../routes.hooks';

import { MaxWidthTextBlock } from './components/MaxWidthTextBlock';
import { MainM3ConnectionInfo } from './components/MainM3ConnectionInfo';
import { MetadataPublisherCredentials } from './components/MetadataPublisherCredentials';
import { ActionButtons } from './components/ActionButtons';

import { IonServiceAccount } from './components/ionServiceAccount';
import { ConnectorBundle } from './components/connectorBundle';
//import { connectionConfigurationReducer } from './connectionConfigurationReducer';

const accordionListProps: AccordionListProps = {
    singleExpandMode: true,
    items: [
        {
            id: 'hostConnectorBundle',
            title: 'Host Your Connector Bundle',
            children: <ConnectorBundle />,
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
            children: <IonServiceAccount />,
            sx: { mt: 8 },
        },
    ],
};

type M3ConnectionParameters = {
    connectorName: string;
    selectHosting: string;
    metadataPublisher: string;
    metadataPublisherPassword: string;
};

export const NewConnectionView = () => {
    const connectionId = useConnectionId();
    const query = useConnectionsIdGet({ id: connectionId || '' });
    const nameMutation = useConnectionsIdNamePost();
    const mdpConfigurationMutation = useConnectionsIdConfigurationMdpPost();
    const ionConfigurationMutation = useConnectionsIdConfigurationIonPost();
    const onPremisesConfigurationMutation = useConnectionsIdDeployOnPremisesPost();
    const onCloudConfigurationMutation = useConnectionsIdDeployCloudPost();
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    //const [state, dispatch] = useReducer(connectionConfigurationReducer, { deploymentType: '', name: '' });

    if (query.isLoading) return <>Loading</>;
    if (!query.data?.value || !connectionId) return null;

    const connection = query.data.value;
    const links = query.data.links;

    const hasSelectedDeploymentType = connection.chosenEnvironment?.value?.toLowerCase() !== 'unknown';

    const handleM3ConnectionSave = (values: M3ConnectionParameters) => {
        const { connectorName, selectHosting, metadataPublisher, metadataPublisherPassword } = values;

        if (connection.name !== connectorName) {
            nameMutation.mutate(
                {
                    id: connectionId,
                    body: connectorName
                },
                {
                    onSuccess: () => {
                        enqueueSnackbar('Saved Name');
                        queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.Connection_GET, connectionId] });
                    }, onError: () => console.log('Error')
                }
            );
        }

        if (!hasSelectedDeploymentType && selectHosting) {
            if (selectHosting === 'On premises') {
                onPremisesConfigurationMutation.mutate(
                    {
                        id: connectionId,
                    },
                    {
                        onSuccess: () => {
                            enqueueSnackbar('Saved Hosting Type');
                            queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.Connection_GET, connectionId] });
                        }, onError: () => console.log('Error')
                    }
                );
            }

            if (selectHosting === 'Cloud') {
                onCloudConfigurationMutation.mutate(
                    {
                        id: connectionId,
                    },
                    {
                        onSuccess: () => {
                            enqueueSnackbar('Saved Hosting Type');
                            queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.Connection_GET, connectionId] });
                        }, onError: () => console.log('Error')
                    }
                );
            }
        }

        if (connection._configuration?.mdp?.url !== metadataPublisher
            || connection._configuration?.mdp?.password !== metadataPublisherPassword) {
            mdpConfigurationMutation.mutate(
                {
                    id: connectionId,
                    metadataPublisherConfigRequest: {
                        url: metadataPublisher,
                        password: metadataPublisherPassword
                    },
                },
                { onSuccess: () => {
                    enqueueSnackbar('Saved MDP Configuration');
                    queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.Connection_GET, connectionId] });
                }, onError: () => console.log('Error') }
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
                        selectHosting: hasSelectedDeploymentType ? connection.chosenEnvironment?.value || '' : '',
                        metadataPublisher: connection._configuration?.mdp?.url || '',
                        metadataPublisherPassword: connection._configuration?.mdp?.password || '',
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
