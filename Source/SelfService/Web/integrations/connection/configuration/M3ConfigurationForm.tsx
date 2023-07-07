// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useImperativeHandle, useState, useCallback, useEffect } from 'react';

import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';
import { SubmitHandler } from 'react-hook-form';

import { Form, FormRef } from '@dolittle/design-system';

import { CACHE_KEYS } from '../../../apis/integrations/CacheKeys';
import { ConnectionModel, IonConfigRequest } from '../../../apis/integrations/generated';
import { useConnectionsIdNamePost } from '../../../apis/integrations/connectionsApi.hooks';
import { useConnectionsIdDeployCloudPost, useConnectionsIdDeployOnPremisesPost } from '../../../apis/integrations/deploymentApi.hooks';
import { useConnectionsIdConfigurationMdpPost, useConnectionsIdConfigurationIonPost } from '../../../apis/integrations/connectionConfigurationApi.hooks';

const useForceSubscribeToIonConfigurationStateChanges = (currentForm: FormRef<M3ConnectionParameters> | undefined) => {
    useEffect(() => {
        if (currentForm) {
            const { isDirty } = currentForm.getFieldState('ionConfiguration', currentForm.formState);
        }
    }, [currentForm]);
};

export type M3ConnectionParameters = {
    connectorName: string;
    selectHosting: string;
    metadataPublisherUrl: string;
    metadataPublisherPassword: string;
    ionConfiguration: IonConfigRequest;
};

export type M3ConfigurationFormRef = {
    reset: (keepDefault: boolean) => void;
};

export type M3ConfigurationFormProps = {
    connectionId: string;
    connection: ConnectionModel
    hasSelectedDeploymentType: boolean;
    onSaved?: () => void;
    children?: React.ReactNode;
};

export const M3ConfigurationForm = React.forwardRef<M3ConfigurationFormRef, M3ConfigurationFormProps>((
    {
        connectionId,
        connection,
        hasSelectedDeploymentType,
        onSaved,
        children
    }: M3ConfigurationFormProps,
    ref: React.Ref<M3ConfigurationFormRef>
) => {
    const [currentForm, setCurrentForm] = useState<FormRef<M3ConnectionParameters>>();
    const formRef = useCallback((ref) => {
        if (ref) {
            setCurrentForm(ref);
        }
    }, []);

    useImperativeHandle(ref, () => ({
        reset(keepDefault: boolean) {
            if (currentForm) {
                currentForm.reset(keepDefault ? currentForm.formState.defaultValues : undefined);
            }
        }
    }), [currentForm]);

    useForceSubscribeToIonConfigurationStateChanges(currentForm);

    useEffect(() => {
        if (currentForm?.formState.isSubmitSuccessful) {
            currentForm.reset(currentForm.getValues());
            onSaved?.();
        }
    }, [currentForm?.reset, currentForm?.formState.isSubmitSuccessful, currentForm?.formState.defaultValues, onSaved]);


    const { enqueueSnackbar } = useSnackbar();

    const queryClient = useQueryClient();

    const nameMutation = useConnectionsIdNamePost();
    const onPremisesConfigurationMutation = useConnectionsIdDeployOnPremisesPost();
    const onCloudConfigurationMutation = useConnectionsIdDeployCloudPost();
    const ionConfigurationMutation = useConnectionsIdConfigurationIonPost();
    const mdpConfigurationMutation = useConnectionsIdConfigurationMdpPost();

    const deploymentType = connection.chosenEnvironment?.value;
    const metadataPublisherUrl = connection._configuration?.mdp?.url;
    const metadataPublisherPassword = connection._configuration?.mdp?.password;
    const ionConfiguration = connection._configuration?.ion;

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
                    onSuccess: () => {
                        handleSuccessfulSave('Saved Name');
                    },
                    onError: (error) => handleErrorWhenSaving('Error saving Name', error),
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
                        onSuccess: () => {
                            handleSuccessfulSave('Saved Hosting Type');
                        },
                        onError: (error) => handleErrorWhenSaving('Error saving Hosting Type', error),
                    },
                );
            }

            if (data.selectHosting === 'Cloud') {

                onCloudConfigurationMutation.mutate(
                    {
                        id: connectionId,
                    },
                    {
                        onSuccess: () => {
                            handleSuccessfulSave('Saved Hosting Type');
                        },
                        onError: (error) => handleErrorWhenSaving('Error saving Hosting Type', error),
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
                    onSuccess: () => {
                        handleSuccessfulSave('Saved MDP Configuration');
                    },
                    onError: (error) => handleErrorWhenSaving('Error saving MDP Configuration', error),
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
                    },
                    onError: (error) => handleErrorWhenSaving('Error saving ION Configuration', error),
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
    ]);

    const handleSuccessfulSave = (message: string) => {
        enqueueSnackbar(message);
        queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.Connection_GET, connectionId] });
    };

    const handleErrorWhenSaving = (message: string, error: unknown) => {
        console.log(message, error);
        enqueueSnackbar(message);
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
});

M3ConfigurationForm.displayName = 'M3ConfigurationForm';
