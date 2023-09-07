// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useImperativeHandle, useState, useCallback, useEffect, useMemo } from 'react';

import { SubmitHandler } from 'react-hook-form';

import { Form, FormRef } from '@dolittle/design-system';

import { ConnectionModel } from '../../../../../apis/integrations/generated';
import { useConnectionsIdConfigurationExporterCronPost, useConnectionsIdConfigurationExporterStrictCertificateValidationPost } from '../../../../../apis/integrations/connectionConfigurationApi.hooks';


//TODO: Can this be replaced with using `watch` from react-hook-form?
const useForceSubscribeToCronExpressionStateChanges = (currentForm: FormRef<ConnectorConfigurationFormParameters> | undefined) => {
    useEffect(() => {
        if (currentForm) {
            const { isDirty } = currentForm.getFieldState('cronExpression', currentForm.formState);
        }
    }, [currentForm]);
};

export type ConfigurationSaveActionName =
    | 'Cron'
    | 'Strict Certificate Validation';

export type ConfigurationSaveActionState =
    | { status: 'success' }
    | { status: 'error', errorMessage?: string };

export type ConfigurationFormSaveAction = { name: ConfigurationSaveActionName } & ConfigurationSaveActionState;

export type ConnectorConfigurationFormSaveState = ConfigurationFormSaveAction[];

export type ConnectorConfigurationFormRef = {
    reset: (keepDefault: boolean) => void;
};

export type ConnectorConfigurationFormParameters = {
    cronExpression: string;
    strictCertificateValidation: boolean;
};

export type ConnectorConfigurationFormProps = {
    connectionId: string;
    connection: ConnectionModel
    onSaved?: (saveState: ConnectorConfigurationFormSaveState) => void;
    children?: React.ReactNode;
};

export const ConnectorConfigurationForm = React.forwardRef<ConnectorConfigurationFormRef, ConnectorConfigurationFormProps>(({
    connectionId,
    connection,
    onSaved,
    children
}: ConnectorConfigurationFormProps,
    ref: React.Ref<ConnectorConfigurationFormRef>
) => {
    const [currentForm, setCurrentForm] = useState<FormRef<ConnectorConfigurationFormParameters>>();
    const [lastSaveState, setLastSaveState] = useState<ConnectorConfigurationFormSaveState>();
    const formRef = useCallback((ref) => {
        if (ref) {
            setCurrentForm(ref);
        }
    }, []);
    if (currentForm) {
        const cronExpressionWatch = currentForm.watch('cronExpression');
    }

    useImperativeHandle(ref, () => ({
        reset(keepDefault: boolean) {
            if (currentForm) {
                currentForm.reset(keepDefault ? defaultValues : undefined);
            }
        }
    }), [currentForm]);


    useEffect(() => {
        if (currentForm?.formState.isSubmitSuccessful && lastSaveState?.length) {
            currentForm.reset(currentForm.getValues());
            onSaved?.(lastSaveState);
        }
    }, [currentForm?.reset, currentForm?.formState.isSubmitSuccessful, currentForm?.formState.defaultValues, onSaved, lastSaveState]);

    const cronMutation = useConnectionsIdConfigurationExporterCronPost();
    const strictCertificateValidationMutation = useConnectionsIdConfigurationExporterStrictCertificateValidationPost();

    const defaultValues: ConnectorConfigurationFormParameters = useMemo(() => (
        {
            cronExpression: connection.cronExportTrigger || '',
            strictCertificateValidation: connection.strictCertificateValidation || false,
        }
    ), [connection]);

    useForceSubscribeToCronExpressionStateChanges(currentForm);

    /**
     * Reset the form defaults when the default values change, and keep any dirty values
     * The idea here is to set the *Initial* state. If the form needs to be reset, then use the reset function available on the imperativeRef from parent component.
     */
    useEffect(() => {
        if (currentForm) {
            currentForm.reset(defaultValues, { keepDirtyValues: true });
        }

    }, [defaultValues, currentForm]);

    const handleSave: SubmitHandler<ConnectorConfigurationFormParameters> = useCallback((data) => {
        if (!connectionId || !currentForm) {
            return;
        }
        setLastSaveState([]);
        const saveActions: (
            | { name: Extract<ConfigurationSaveActionName, 'Cron'| 'Strict Certificate Validation'>, action: Promise<void> }
        )[] = [];
        const getFieldState = (field) => currentForm.getFieldState(field, currentForm.formState);

        const cronExpressionFieldState = getFieldState('cronExpression');
        if (cronExpressionFieldState.isDirty) {
            saveActions.push({
                name: 'Cron',
                action: cronMutation.mutateAsync(
                    {
                        id: connectionId,
                        cronExpression: data.cronExpression,
                    },
                )
            });
        }

        const strictCertificateValidationExpressionFieldState = getFieldState('strictCertificateValidation');
        if (strictCertificateValidationExpressionFieldState.isDirty) {
            saveActions.push({
                name: 'Strict Certificate Validation',
                action: strictCertificateValidationMutation.mutateAsync(
                    {
                        id: connectionId,
                        enable: data.strictCertificateValidation,
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
                        const successSate: ConfigurationFormSaveAction = { name: saveAction.name, status: 'success' };
                        return successSate;
                    }
                    const errorState: ConfigurationFormSaveAction = { name: saveAction.name, status: 'error', errorMessage: result.reason };
                    return errorState;
                });
                setLastSaveState(saveState);
            });
    }, [
        currentForm?.getFieldState,
        connectionId,
        cronMutation,
    ]);

    return (
        <Form<ConnectorConfigurationFormParameters>
            initialValues={defaultValues}
            onSubmit={(data, event) => handleSave(data, event)}
            fRef={formRef}
        >
            {children}
        </Form>
    );
});

ConnectorConfigurationForm.displayName = 'M3ConfigurationForm';
