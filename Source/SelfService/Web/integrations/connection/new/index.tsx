// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useReducer } from 'react';

import { Box, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { AccordionList, AccordionListProps, Button, Form } from '@dolittle/design-system';

//import { CACHE_KEYS } from '../../../apis/integrations/CacheKeys';
import { useConnectionsIdGet, useConnectionsIdNamePost } from '../../../apis/integrations/connectionsApi.hooks';
import { useConnectionsIdConfigurationMdpPost, useConnectionsIdConfigurationIonPost } from '../../../apis/integrations/connectionConfigurationApi.hooks';

import { Page } from '../../../components/layout/page';
import { useConnectionId } from '../../routes.hooks';

import { MaxWidthTextBlock } from './components/MaxWidthTextBlock';
import { MainM3ConnectionInfo } from './components/MainM3ConnectionInfo';
import { MetadataPublisherCredentials } from './components/MetadataPublisherCredentials';
import { ActionButtons } from './components/actionButtons';

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
    const queryClient = useQueryClient();

    //const [state, dispatch] = useReducer(connectionConfigurationReducer, { deploymentType: '', name: '' });

    if (query.isLoading) return <>Loading</>;
    if (!query.data?.value || !connectionId) return null;

    const connection = query.data.value;
    const links = query.data.links;
    //const shouldUseOnPrem = links?.some(link => link.rel === 'deploy-on-premise') || false;
    //const shouldUseCloud = links?.some(link => link.rel === 'deploy-to-cloud') || false;

    console.log('links', links);

    const handleM3ConnectionSave = (values: M3ConnectionParameters) => {
        const { connectorName, selectHosting, metadataPublisher, metadataPublisherPassword } = values;

        console.log('values', values);

        if (connection.name !== connectorName) {
            nameMutation.mutate(
                { id: connectionId, body: connectorName },
                {
                    onSuccess(data, variables, context) {
                        console.log('Success', data);
                    },
                    onError(data, variables, context) {
                        console.log('Error', data);
                    },
                }
            );
        }

        // nameMutation.mutate(
        //     { id: connectionId, body: state.name },
        //     {
        //         onSuccess(data, variables, context) {
        //             //TODO: Is invalidating enough, or do you also have to reftch?
        //             queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.Connections_GET, connectionId] });
        //             console.log('Success', data);
        //         },
        //         onError(data, variables, context) {
        //             console.log('Error', data);
        //         },
        //     }
        // );
    };

    return (
        <Page title='New M3 Connection'>
            <Box sx={{ maxWidth: 814, mt: 7, ml: 1 }}>
                <Typography variant='subtitle1'>{`Let's get your M3 connector up and running...`}</Typography>

                <Form<M3ConnectionParameters>
                    initialValues={{
                        connectorName: connection.name || '',
                        selectHosting: 'On Premise',
                        metadataPublisher: connection._configuration?.mdp?.url || '',
                        metadataPublisherPassword: connection._configuration?.mdp?.password || '',
                    }}
                    onSubmit={handleM3ConnectionSave}
                    sx={{ ml: 3 }}
                >
                    <MainM3ConnectionInfo />

                    <AccordionList  {...accordionListProps} />

                    <ActionButtons />
                </Form>
            </Box>
        </Page>
    );
};
