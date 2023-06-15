// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useRef, useMemo } from 'react';

import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';
import { SubmitHandler } from 'react-hook-form';

import { Box, Typography } from '@mui/material';

import { AccordionList, AccordionListProps, Form, FormRef } from '@dolittle/design-system';

import { CACHE_KEYS } from '../../../apis/integrations/CacheKeys';
import { IonConfigRequest } from '../../../apis/integrations/generated';
import { useConnectionsIdGet, useConnectionsIdNamePost } from '../../../apis/integrations/connectionsApi.hooks';
import { useConnectionsIdDeployCloudPost, useConnectionsIdDeployOnPremisesPost } from '../../../apis/integrations/deploymentApi.hooks';
import { useConnectionsIdConfigurationMdpPost, useConnectionsIdConfigurationIonPost } from '../../../apis/integrations/connectionConfigurationApi.hooks';

import { useConnectionId } from '../../routes.hooks';

import { Page } from '../../../components/layout/page';

import { MainM3ConnectionInfo } from './components/MainM3ConnectionInfo';
import { ActionButtons } from './components/ActionButtons';
import { useBuildConfigurationAccordionList } from './useBuildConfigurationAccordionList';


export type M3ConnectionParameters = {
    connectorName: string;
    selectHosting: string;
    metadataPublisherUrl: string;
    metadataPublisherPassword: string;
    ionConfiguration: IonConfigRequest;
};

export const NewConnectionView = () => {
    const [currentForm, setCurrentForm] = useState<FormRef<M3ConnectionParameters>>();
    const formRef = useCallback((ref) => {
        if (ref) {
            setCurrentForm(ref);
        }
    }, []);
    const { enqueueSnackbar } = useSnackbar();

    const connectionId = useConnectionId();
    const queryClient = useQueryClient();
    const query = useConnectionsIdGet(
        { id: connectionId || '' },
        { refetchInterval: (data) => data?.value?.status.name !== 'Connected' ? 5000 : false }
    );

    const nameMutation = useConnectionsIdNamePost();
    const onPremisesConfigurationMutation = useConnectionsIdDeployOnPremisesPost();
    const onCloudConfigurationMutation = useConnectionsIdDeployCloudPost();
    const ionConfigurationMutation = useConnectionsIdConfigurationIonPost();
    const mdpConfigurationMutation = useConnectionsIdConfigurationMdpPost();
    const fileUploadRef = useRef<FileUploadFormRef>(null);
    const connection = query.data?.value;

    if (query.isLoading) return <>Loading</>;
    if (!connection || !connectionId) return null;

    const links = query.data?.links || [];

    const deploymentType = connection.chosenEnvironment?.value;
    const hasSelectedDeploymentType = deploymentType?.toLowerCase() !== 'unknown';
    const metadataPublisherUrl = connection._configuration?.mdp?.url;
    const metadataPublisherPassword = connection._configuration?.mdp?.password;
    const ionConfiguration = connection._configuration?.ion;

    const handleSuccessfulSave = (message: string) => {
        enqueueSnackbar(message);
        queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.Connection_GET, connectionId] });
    };
    const accordionListProps: AccordionListProps = useBuildConfigurationAccordionList(connection, fileUploadRef);

    useEffect(() => {
        if (currentForm) {
            console.log('Subscribing to ionConfiguration field state');
            const { isDirty } = currentForm?.getFieldState('ionConfiguration', currentForm.formState);
        }
    }, [currentForm]);


    const handleM3ConnectionSave: SubmitHandler<M3ConnectionParameters> = (data) => {
        const getFieldState = formRef.current?.getFieldState;

        if (getFieldState?.('connectorName').isDirty) {
            nameMutation.mutate(
                {
                    id: connectionId,
                    body: data.connectorName,
                },
                {
                    onSuccess: () => { handleSuccessfulSave('Saved Name'); },
                    onError: () => console.log('Error'),
                },
            );
        }

        if (!hasSelectedDeploymentType && getFieldState?.('selectHosting').isDirty) {
            if (data.selectHosting === 'On premises') {
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

            if (data.selectHosting === 'Cloud') {
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

        if (getFieldState?.('metadataPublisherUrl').isDirty || getFieldState?.('metadataPublisherPassword').isDirty) {
            mdpConfigurationMutation.mutate(
                {
                    id: connectionId,
                    metadataPublisherConfigRequest: {
                        url: data.metadataPublisherUrl,
                        password: data.metadataPublisherPassword,
                    },
                },
                {
                    onSuccess: () => { handleSuccessfulSave('Saved MDP Configuration'); },
                    onError: () => console.log('Error'),
                },
            );
        }

        if (getFieldState?.('ionConfiguration').isDirty) {
            ionConfigurationMutation.mutate(
                {
                    id: connectionId,
                    ionConfigRequest: data.ionConfiguration,
                },
                {
                    onSuccess: () => {
                        handleSuccessfulSave('Saved ION Configuration');
                        fileUploadRef.current?.clearSelected();
                    },
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
                        ionConfiguration: {
                            iu: ionConfiguration.gatewayUrl,
                            pu: ionConfiguration.oauthTokenUrl,
                            ot: ionConfiguration.byUser,
                            saak: ionConfiguration.username,
                            sask:ionConfiguration.password,
                            ci: ionConfiguration.clientId,
                            cs: ionConfiguration.clientSecret,
                         },
                    }}
                    onSubmit={handleM3ConnectionSave}
                    sx={{ ml: 3 }}
                    fRef={formRef}
                >
                    <MainM3ConnectionInfo hasSelectedDeploymentType={hasSelectedDeploymentType} connectionIdLinks={links} />

                    <AccordionList  {...accordionListProps} />

                    <ActionButtons />
                </Form>
            </Box>
        </Page>
    );
};
