// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useImperativeHandle, useState, useCallback, useEffect, useMemo } from 'react';

import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';
import { SubmitHandler } from 'react-hook-form';

import { Form, FormRef } from '@dolittle/design-system';

import { CACHE_KEYS } from '../../../../apis/integrations/CacheKeys';
import { ConnectionModel, ConnectionModelResult, IonConfigRequest, IonConfigurationResult, M3BasicAuthConfigRequest, M3BasicAuthConfigurationResult, MdpConfigurationResult, StringResult } from '../../../../apis/integrations/generated';
import { useConnectionsIdNamePost } from '../../../../apis/integrations/connectionsApi.hooks';
import { useConnectionsIdDeployCloudPost, useConnectionsIdDeployOnPremisesPost } from '../../../../apis/integrations/deploymentApi.hooks';
import { useConnectionsIdConfigurationMdpPost, useConnectionsIdConfigurationIonPost, useConnectionsIdConfigurationBasicPost } from '../../../../apis/integrations/connectionConfigurationApi.hooks';

//TODO: Can this be replaced with using `watch` from react-hook-form?
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
    basicConfiguration: M3BasicAuthConfigRequest
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

export type SaveActionName = | 'Name' | 'Hosting Type' | 'MDP Configuration' | 'ION Configuration' | 'Basic Configuration';
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

    const nameMutation = useConnectionsIdNamePost();
    const onPremisesConfigurationMutation = useConnectionsIdDeployOnPremisesPost();
    const onCloudConfigurationMutation = useConnectionsIdDeployCloudPost();
    const ionConfigurationMutation = useConnectionsIdConfigurationIonPost();
    const mdpConfigurationMutation = useConnectionsIdConfigurationMdpPost();
    const basicConfigurationMutation = useConnectionsIdConfigurationBasicPost();

    const defaultValues: M3ConnectionParameters = useMemo(() => {
        const deploymentType = connection.chosenEnvironment?.value;
        const metadataPublisherUrl = connection._configuration?.mdp?.url;
        const metadataPublisherPassword = connection._configuration?.mdp?.password;
        const ionConfiguration = connection._configuration?.ion;
        const basicConfiguration = connection._configuration?.m3BasicAuth;

        return {
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
            basicConfiguration: {
                username: basicConfiguration?.username || '',
                password: basicConfiguration?.password || '',
                host: basicConfiguration?.host || '',
                allowInsecureSsl: basicConfiguration?.allowInsecureSsl || undefined,
            }
        };
    }, [connection, hasSelectedDeploymentType, authenticationType]);

    /**
     * Reset the form defaults when the default values change, and keep any dirty values
     * The idea here is to set the *Initial* state. If the form needs to be reset, then use the reset function available on the imperativeRef from parent component.
     */
    useEffect(() => {
        if (currentForm) {
            currentForm.reset(defaultValues, { keepDirtyValues: true });
        }

    }, [defaultValues, currentForm]);

    const handleM3ConnectionSave: SubmitHandler<M3ConnectionParameters> = useCallback((data) => {
        if (!connectionId || !currentForm) {
            return;
        }
        setLastSaveState([]);
        const saveActions:
            | ({ name: Extract<SaveActionName, 'Name'>, action: Promise<StringResult> }
                | { name: Extract<SaveActionName, 'Hosting Type'>, action: Promise<ConnectionModelResult> }
                | { name: Extract<SaveActionName, 'ION Configuration'>, action: Promise<IonConfigurationResult> }
                | { name: Extract<SaveActionName, 'MDP Configuration'>, action: Promise<MdpConfigurationResult> }
                | { name: Extract<SaveActionName, 'Basic Configuration'>, action: Promise<M3BasicAuthConfigurationResult> })[] = [];
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
                name: 'MDP Configuration',
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

        const basicUsername = getFieldState('basicConfiguration.username');
        const basicPassword = getFieldState('basicConfiguration.password');
        const basicHost = getFieldState('basicConfiguration.host');
        if ((basicUsername.isDirty || basicPassword.isDirty || basicHost.isDirty) &&
            (data.basicConfiguration.username && data.basicConfiguration.password && data.basicConfiguration.host)) {
            saveActions.push({
                name: 'Basic Configuration',
                action: basicConfigurationMutation.mutateAsync(
                    {
                        id: connectionId,
                        m3BasicAuthConfigRequest: {
                            host: data.basicConfiguration.host,
                            username: data.basicConfiguration.username,
                            password: data.basicConfiguration.password,
                        }
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
