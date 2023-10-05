// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useImperativeHandle, useState, useCallback, useEffect, useMemo } from 'react';

import { SubmitHandler } from 'react-hook-form';

import { Form, FormRef } from '@dolittle/design-system';

import { ConnectionModel } from '../../../../../apis/integrations/generated';
import { useConnectionsIdConfigurationExporterCronPost } from '../../../../../apis/integrations/connectionConfigurationApi.hooks';

const useForceSubscribeToisDirtyStateChanges = (currentForm: FormRef<DataSyncFormParameters> | undefined) => {
    useEffect(() => {
        if (currentForm) {
            const { isDirty } = currentForm.getFieldState('cronExpression', currentForm.formState);
        }
    }, [currentForm]);
};


export type DataSyncSaveActionName =
    | 'Cron';

export type DataSyncSaveActionState =
    | { status: 'success' }
    | { status: 'error', errorMessage?: string };

export type DataSyncFormSaveAction = { name: DataSyncSaveActionName } & DataSyncSaveActionState;

export type DataSyncFormSaveState = DataSyncFormSaveAction[];

export type DataSyncFormRef = {
    reset: (keepDefault: boolean) => void;
};

export type DataSyncFormParameters = {
    cronExpression: string;
};

export type DataSyncFormProps = {
    connectionId: string;
    connection: ConnectionModel
    onSaved?: (saveState: DataSyncFormSaveState) => void;
    children?: React.ReactNode;
};

export const DataSyncForm = React.forwardRef<DataSyncFormRef, DataSyncFormProps>(({
    connectionId,
    connection,
    onSaved,
    children
}: DataSyncFormProps,
    ref: React.Ref<DataSyncFormRef>
) => {
    const [currentForm, setCurrentForm] = useState<FormRef<DataSyncFormParameters>>();
    const [lastSaveState, setLastSaveState] = useState<DataSyncFormSaveState>();
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

    const defaultValues: DataSyncFormParameters = useMemo(() => (
        {
            cronExpression: connection.cronExportTrigger || '',
        }
    ), [connection]);

    useForceSubscribeToisDirtyStateChanges(currentForm);

    /**
     * Reset the form defaults when the default values change, and keep any dirty values
     * The idea here is to set the *Initial* state. If the form needs to be reset, then use the reset function available on the imperativeRef from parent component.
     */
    useEffect(() => {
        if (currentForm) {
            currentForm.reset(defaultValues, { keepDirtyValues: true });
        }

    }, [defaultValues, currentForm]);

    const handleSave: SubmitHandler<DataSyncFormParameters> = useCallback((data) => {
        if (!connectionId || !currentForm) {
            return;
        }
        setLastSaveState([]);
        const saveActions: (
            | { name: Extract<DataSyncSaveActionName, 'Cron'>, action: Promise<void> }
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

        Promise.allSettled(saveActions.map((action) => action.action))
            .then((results) => {
                // use the index of the result to get the corresponding save action name and map this to a success or error state.
                const saveState = results.map((result, index) => {
                    const saveAction = saveActions[index];
                    if (result.status === 'fulfilled') {
                        const successSate: DataSyncFormSaveAction = { name: saveAction.name, status: 'success' };
                        return successSate;
                    }
                    const errorState: DataSyncFormSaveAction = { name: saveAction.name, status: 'error', errorMessage: result.reason };
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
        <Form<DataSyncFormParameters>
            initialValues={defaultValues}
            onSubmit={(data, event) => handleSave(data, event)}
            fRef={formRef}
        >
            {children}
        </Form>
    );
});

DataSyncForm.displayName = 'DataSyncForm';
