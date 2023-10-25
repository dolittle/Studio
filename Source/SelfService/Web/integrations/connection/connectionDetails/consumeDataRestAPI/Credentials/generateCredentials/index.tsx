// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useRef, useState } from 'react';

import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

import { Form, FormRef } from '@dolittle/design-system';

import { useConnectionsIdServiceAccountsServiceAccountNamePost } from '../../../../../../apis/integrations/serviceAccountApi.hooks';
import { ResponseError, ServiceAccountCreatedDto } from '../../../../../../apis/integrations/generated';
import { CACHE_KEYS } from '../../../../../../apis/integrations/CacheKeys';

import { GenerateCredentials } from './GenerateCredentials';
import { GenerateCredentialsFormSubmitButton } from './GenerateCredentialsFormSubmitButton';
import { GeneratedCredentialsSection } from './GeneratedCredentialsSection';

export type GenerateCredentialsFormParameters = {
    name: string;
    description?: string;
    token?: string;
};

export type GenerateCredentialsIndexProps = {
    connectionId: string;
    resetForm: boolean;
    onFormComplete(tokenName: string): void;
    canCancel: boolean;
    onFormCancelled(): void;
};

export const GenerateCredentialsIndex = ({ connectionId, resetForm, onFormComplete, canCancel, onFormCancelled }: GenerateCredentialsIndexProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const formRef = useRef<FormRef<GenerateCredentialsFormParameters>>(null);

    const [token, setToken] = useState<string | undefined>(undefined);
    const [formSubmitError, setFormSubmitError] = useState<string | undefined>(undefined);

    const generateTokenMutation = useConnectionsIdServiceAccountsServiceAccountNamePost();
    const hasResult = !!token;

    const handleGenerate = (fieldValues: GenerateCredentialsFormParameters) => {
        setFormSubmitError(undefined);

        generateTokenMutation.mutate({
            id: connectionId,
            serviceAccountName: fieldValues.name,
            description: fieldValues.description,
        }, {
            onSuccess: (data: ServiceAccountCreatedDto) => {
                setToken(data.token);
                formRef.current?.setValue('token', data.token);
                queryClient.invalidateQueries([CACHE_KEYS.ConnectionServiceAccounts_GET, connectionId]);
            },
            onError: async (error) => {
                let message = `Error while generating token.`;
                if (error instanceof ResponseError) {
                    if (error.response.body) {
                        const body = await error.response.text();
                        message = `${message} error: ${body}`;
                    }
                }
                setFormSubmitError(message);
                enqueueSnackbar(message, { variant: 'error' });
            },
        });
        onFormComplete(fieldValues.name);
    };

    useEffect(() => {
        if (resetForm) handleFormReset();
    }, [resetForm]);

    const handleFormReset = () => {
        setFormSubmitError(undefined);
        setToken(undefined);
        formRef.current?.reset();
    };

    const handleTokenCopy = () => {
        navigator.clipboard.writeText(token || '');
        enqueueSnackbar('Token copied to clipboard.');
    };

    return (
        <>
            <Form<GenerateCredentialsFormParameters>
                initialValues={{
                    name: '',
                    description: '',
                    token: '',
                }}
                onSubmit={handleGenerate}
                fRef={formRef}
            >
                <>
                    <GenerateCredentials hasResult={hasResult} hasError={formSubmitError} />

                    {!hasResult || formSubmitError
                        ? <GenerateCredentialsFormSubmitButton canCancel={canCancel} onFormCancelled={() => onFormCancelled()} />
                        : <GeneratedCredentialsSection onTokenCopy={handleTokenCopy} />
                    }
                </>
            </Form>
        </>
    );
};
