// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useRef, useState, useCallback, useEffect } from 'react';

import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';
import { SubmitHandler } from 'react-hook-form';

import { FileUploadFormRef, Form, FormRef } from '@dolittle/design-system';

import { CACHE_KEYS } from '../../../../apis/integrations/CacheKeys';
import { ConnectionModel, IonConfigRequest } from '../../../../apis/integrations/generated';
import { useConnectionsIdNamePost } from '../../../../apis/integrations/connectionsApi.hooks';
import { useConnectionsIdDeployCloudPost, useConnectionsIdDeployOnPremisesPost } from '../../../../apis/integrations/deploymentApi.hooks';
import { useConnectionsIdConfigurationMdpPost, useConnectionsIdConfigurationIonPost } from '../../../../apis/integrations/connectionConfigurationApi.hooks';

export type M3ConnectionParameters = {
    connectorName: string;
    selectHosting: string;
    metadataPublisherUrl: string;
    metadataPublisherPassword: string;
    ionConfiguration: IonConfigRequest;
};

export type M3ConfigurationFormProps = {
    connectionId: string;
    connection: ConnectionModel
    hasSelectedDeploymentType: boolean;
    children?: React.ReactNode;
};

export const M3ConfigurationForm = ({ connectionId, connection, hasSelectedDeploymentType, children }: M3ConfigurationFormProps) => {
    const [currentForm, setCurrentForm] = useState<FormRef<M3ConnectionParameters>>();
    const formRef = useCallback((ref) => {
        if (ref) {
            setCurrentForm(ref);
        }
    }, []);
    const { enqueueSnackbar } = useSnackbar();

    const queryClient = useQueryClient();

    const nameMutation = useConnectionsIdNamePost();
    const onPremisesConfigurationMutation = useConnectionsIdDeployOnPremisesPost();
    const onCloudConfigurationMutation = useConnectionsIdDeployCloudPost();
    const ionConfigurationMutation = useConnectionsIdConfigurationIonPost();
    const mdpConfigurationMutation = useConnectionsIdConfigurationMdpPost();
    const fileUploadRef = useRef<FileUploadFormRef>(null);

    const deploymentType = connection.chosenEnvironment?.value;
    const metadataPublisherUrl = connection._configuration?.mdp?.url;
    const metadataPublisherPassword = connection._configuration?.mdp?.password;
    const ionConfiguration = connection._configuration?.ion;


    useEffect(() => {
        if (currentForm) {
            const { isDirty } = currentForm?.getFieldState('ionConfiguration', currentForm.formState);
        }
    }, [currentForm]);

    const handleM3ConnectionSave: SubmitHandler<M3ConnectionParameters> = useCallback((data) => {
        if (!connectionId || !currentForm) {
            return;
        }

        const getFieldState = (field) => currentForm.getFieldState(field, currentForm.formState);

        const connectorNameFieldState = getFieldState('connectorName');
        if (connectorNameFieldState.isDirty) {
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

        const selectHostingFieldState = getFieldState('selectHosting');
        if (!hasSelectedDeploymentType && selectHostingFieldState.isDirty) {
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

        const metadataPublisherUrlFieldState = getFieldState('metadataPublisherUrl');
        const metadataPublisherPasswordFieldState = getFieldState('metadataPublisherPassword');

        if ((metadataPublisherUrlFieldState.isDirty || metadataPublisherPasswordFieldState.isDirty) &&
            (data.metadataPublisherUrl && data.metadataPublisherPassword)) {
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
        const ionConfigurationFieldState = getFieldState('ionConfiguration');
        if (ionConfigurationFieldState.isDirty) {
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
    }, [
        currentForm,
        connectionId,
        nameMutation,
        onPremisesConfigurationMutation,
        onCloudConfigurationMutation,
        mdpConfigurationMutation, ionConfigurationMutation,
        fileUploadRef
    ]);


    const handleSuccessfulSave = (message: string) => {
        enqueueSnackbar(message);
        queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.Connection_GET, connectionId] });
    };

    return (

        <Form<M3ConnectionParameters>
            initialValues={{
                connectorName: connection.name || '',
                selectHosting: hasSelectedDeploymentType ? deploymentType || '' : '',
                metadataPublisherUrl: metadataPublisherUrl || '',
                metadataPublisherPassword: metadataPublisherPassword || '',
                ionConfiguration: {
                    iu: ionConfiguration?.gatewayUrl || '',
                    pu: ionConfiguration?.oauthTokenUrl || '',
                    ot: ionConfiguration?.byUser || '',
                    saak: ionConfiguration?.username || '',
                    sask: ionConfiguration?.password || '',
                    ci: ionConfiguration?.clientId || '',
                    cs: ionConfiguration?.clientSecret || '',
                },
            }}
            onSubmit={(data, event) => handleM3ConnectionSave(data, event)}
            sx={{ ml: 3 }}
            fRef={formRef}
        >
            {children}
        </Form>
    );
};
