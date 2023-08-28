// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useImperativeHandle, useState, useCallback, useEffect } from 'react';

import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';
import { SubmitHandler } from 'react-hook-form';

import { Form, FormRef } from '@dolittle/design-system';

import { CACHE_KEYS } from '../../../apis/integrations/CacheKeys';
import { ConnectionModel, ConnectionModelResult, IonConfigRequest, IonConfigurationResult, MdpConfigurationResult, StringResult } from '../../../apis/integrations/generated';
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
    selectAuthenticationType: string;
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
    authenticationType?: string;
    onSaved?: (saveState: M3ConfigurationFormSaveState) => void;
    children?: React.ReactNode;
};

export type SaveActionName = | 'Name' | 'Hosting Type' | 'MDP configuration' | 'ION Configuration';
export type SaveActionState =
    | { status: 'success' }
    | { status: 'error', errorMessage?: string };
export type FormSaveAction = { name: SaveActionName } & SaveActionState;

export type M3ConfigurationFormSaveState = FormSaveAction[];

export const M3ConfigurationForm = React.forwardRef<M3ConfigurationFormRef, M3ConfigurationFormProps>((
    {
        connectionId,
        connection,
        hasSelectedDeploymentType,
        authenticationType,
        onSaved,
        children
    }: M3ConfigurationFormProps,
    ref: React.Ref<M3ConfigurationFormRef>
) => {
    const [currentForm, setCurrentForm] = useState<FormRef<M3ConnectionParameters>>();
    const [lastSaveState, setLastSaveState] = useState<M3ConfigurationFormSaveState>();
    const formRef = useCallback((ref) => {
        if (ref) {
            setCurrentForm(ref);
        }
    }, []);

    useImperativeHandle(ref, () => ({
        reset(keepDefault: boolean) {
            if (currentForm) {
                currentForm.reset(keepDefault ? defaultValues : undefined);
            }
        }
    }), [currentForm]);

    useForceSubscribeToIonConfigurationStateChanges(currentForm);

    useEffect(() => {
        if (currentForm?.formState.isSubmitSuccessful && lastSaveState?.length) {
            currentForm.reset(currentForm.getValues());
            onSaved?.(lastSaveState);
        }
    }, [currentForm?.reset, currentForm?.formState.isSubmitSuccessful, currentForm?.formState.defaultValues, onSaved, lastSaveState]);


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

    const defaultValues = {
        connectorName: connection.name || '',
        selectHosting: hasSelectedDeploymentType ? deploymentType || '' : '',
        selectAuthenticationType: authenticationType || '',
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
    };

    const handleM3ConnectionSave: SubmitHandler<M3ConnectionParameters> = useCallback((data) => {
        if (!connectionId || !currentForm) {
            return;
        }
        setLastSaveState([]);
        const saveActions: { name: SaveActionName, action: Promise<StringResult | ConnectionModelResult | IonConfigurationResult | MdpConfigurationResult> }[] = [];
        const getFieldState = (field) => currentForm.getFieldState(field, currentForm.formState);

        const connectorNameFieldState = getFieldState('connectorName');
        if (connectorNameFieldState.isDirty) {
            saveActions.push({
                name: 'Name',
                action: nameMutation.mutateAsync(
                    {
                        id: connectionId,
                        body: data.connectorName,
                    },
                )
            });
        }

        const selectHostingFieldState = getFieldState('selectHosting');
        if (!hasSelectedDeploymentType && selectHostingFieldState.isDirty) {
            if (data.selectHosting === 'On premises') {
                saveActions.push({
                    name: 'Hosting Type',
                    action: onPremisesConfigurationMutation.mutateAsync(
                        {
                            id: connectionId,
                        },
                    )
                });
            }

            if (data.selectHosting === 'Cloud') {

                saveActions.push({
                    name: 'Hosting Type',
                    action: onCloudConfigurationMutation.mutateAsync(
                        {
                            id: connectionId,
                        },
                    )
                });
            }
        }

        const metadataPublisherUrlFieldState = getFieldState('metadataPublisherUrl');
        const metadataPublisherPasswordFieldState = getFieldState('metadataPublisherPassword');
        if ((metadataPublisherUrlFieldState.isDirty || metadataPublisherPasswordFieldState.isDirty) &&
            (data.metadataPublisherUrl && data.metadataPublisherPassword)) {
            saveActions.push({
                name: 'MDP configuration',
                action: mdpConfigurationMutation.mutateAsync(
                    {
                        id: connectionId,
                        metadataPublisherConfigRequest: {
                            url: data.metadataPublisherUrl,
                            password: data.metadataPublisherPassword,
                        },
                    },
                )
            });
        }

        const ionConfigurationFieldState = getFieldState('ionConfiguration');
        if (ionConfigurationFieldState.isDirty) {
            saveActions.push({
                name: 'ION Configuration',
                action: ionConfigurationMutation.mutateAsync(
                    {
                        id: connectionId,
                        ionConfigRequest: data.ionConfiguration,
                    },
                )
            });
        }

        Promise.allSettled(saveActions.map((action) => action.action))
            .then((results) => {
                // use the index of the result to get the corresponding save action name and map this to a success or error state.
                const saveState = results.map((result, index) => {
                    const saveAction = saveActions[index];
                    if (result.status === 'fulfilled') {
                        const successSate: FormSaveAction = { name: saveAction.name, status: 'success' };
                        return successSate;
                    }
                    const errorState: FormSaveAction = { name: saveAction.name, status: 'error', errorMessage: result.reason };
                    return errorState;
                });
                setLastSaveState(saveState);
            });
    }, [
        currentForm,
        connectionId,
        nameMutation,
        onPremisesConfigurationMutation,
        onCloudConfigurationMutation,
        mdpConfigurationMutation,
        ionConfigurationMutation,
    ]);

    const handleSuccessfulSave = (message: string) => {
        enqueueSnackbar(message);
        queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.Connection_GET, connectionId] });
    };

    const handleErrorWhenSaving = (message: string, error: unknown) => {
        console.log(message, error);
        enqueueSnackbar(message, { variant: 'error' });
    };

    return (
        <Form<M3ConnectionParameters>
            initialValues={defaultValues}
            onSubmit={(data, event) => handleM3ConnectionSave(data, event)}
            sx={{ ml: 3 }}
            fRef={formRef}
        >
            {children}
        </Form>
    );
});

M3ConfigurationForm.displayName = 'M3ConfigurationForm';
