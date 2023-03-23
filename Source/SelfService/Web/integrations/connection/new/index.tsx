// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useReducer } from 'react';

import { Box, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { AccordionList, AccordionListProps, Button } from '@dolittle/design-system';

import { CACHE_KEYS } from '../../../apis/integrations/CacheKeys';
import { useConnectionsIdGet, useConnectionsIdNamePost } from '../../../apis/integrations/connectionsApi.hooks';
import { Page } from '../../../components/layout/page';
import { useConnectionId } from '../../routes.hooks';
import { MaxWidthTextBlock } from './components/MaxWidthTextBlock';
import { InitialSetupForm } from './components/initialSetupForm';
import { MetadataPublisherCredentials } from './components/MetadataPublisherCredentials';
import { IonServiceAccount } from './components/ionServiceAccount';
import { ConnectorBundle } from './components/connectorBundle';
import { connectionConfigurationReducer } from './connectionConfigurationReducer';

const newConnectionDescription = `This process might take some time depending on access rights and working knowledge of
                    your organization's firewall and M3 system. You can always save and create the connection setup details then come back at a later time to finish.`;

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


export const NewConnectionView = () => {
    const connectionId = useConnectionId();
    const query = useConnectionsIdGet({ id: connectionId || '' });
    const nameMutation = useConnectionsIdNamePost();
    const queryClient = useQueryClient();

    const [state, dispatch] = useReducer(connectionConfigurationReducer, { deploymentType: '', name: '' });


    if (query.isLoading) {
        return <>Loading</>;
    }

    if (!query.data?.value || !connectionId) {
        return null;
    }
    const connection = query.data.value;
    const links = query.data.links;
    const shouldUseOnPrem = links?.some(link => link.rel === 'deploy-on-premise') || false;
    const shouldUseCloud = links?.some(link => link.rel === 'deploy-to-cloud') || false;

    const handleSave = () => {
        nameMutation.mutate(
            { id: connectionId, body: state.name },
            {
                onSuccess(data, variables, context) {
                    //TODO: Is invalidating enough, or do you also have to reftch?
                    queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.Connections_GET, connectionId] });
                    console.log('Success', data);
                },
                onError(data, variables, context) {
                    console.log('Error', data);
                },
            }
        );
    };

    return (
        <Page title='New M3 Connection'>
            <Box sx={{ maxWidth: 814, mt: 7, ml: 1 }}>
                <Typography variant='subtitle1'>{`Let's get your M3 connector up and running...`}</Typography>

                <Box sx={{ ml: 3 }}>

                    <Box sx={{ mt: 3, ml: 3 }}>
                        <MaxWidthTextBlock>{newConnectionDescription}</MaxWidthTextBlock>
                        <InitialSetupForm
                            connectorName={connection.name || ''}
                            supportsOnPremise={shouldUseOnPrem}
                            supportsCloud={shouldUseCloud}
                            dispatch={dispatch}
                        />
                    </Box>

                    <AccordionList  {...accordionListProps} />

                    <Box sx={{ my: 5 }}>
                        <Button
                            label={nameMutation.isLoading ? '...Loading' : 'Save connection'}
                            // disabled
                            onClick={() => handleSave()}
                            sx={{ mr: 3 }}
                        />

                        <Button
                            label='Start Mapping Data'
                            variant='filled'
                            disabled
                            href='#'
                        />
                    </Box>
                </Box>

            </Box>
        </Page>
    );
};
