// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

import { DialogForm } from '@dolittle/design-system';

import { useConnectionsIdServiceAccountsServiceAccountNamePost } from '../../../../../../../apis/integrations/serviceAccountApi.hooks';
import { ServiceAccountAccess, ServiceAccountCreatedDto, ResponseError } from '../../../../../../../apis/integrations/generated';
import { CACHE_KEYS } from '../../../../../../../apis/integrations/CacheKeys';

import { GenerateCredentials } from './GenerateCredentials';
import { GeneratedCredentialsSection } from './GeneratedCredentialsSection';

export type GenerateCredentialsFormParameters = {
    name: string;
    description?: string;
    access: ServiceAccountAccess;
};

export type GenerateCredentialsDialogIndexProps = {
    connectionId: string;
    isDialogOpen: boolean;
    onDialogCancel: () => void;
    onFormComplete(tokenName: string): void;
};

export const GenerateCredentialsDialogIndex = ({ connectionId, isDialogOpen, onDialogCancel, onFormComplete }: GenerateCredentialsDialogIndexProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState<string | undefined>(undefined);

    const generateTokenMutation = useConnectionsIdServiceAccountsServiceAccountNamePost();
    const hasResult = !!token;

    const handleGenerate = (fieldValues: GenerateCredentialsFormParameters) => {
        setIsLoading(true);

        generateTokenMutation.mutate({
            id: connectionId,
            serviceAccountName: fieldValues.name,
            description: fieldValues.description,
            access: fieldValues.access,
        }, {
            onSuccess: (data: ServiceAccountCreatedDto) => {
                setToken(data.token);
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
                enqueueSnackbar(message, { variant: 'error' });
            },
            onSettled: () => setIsLoading(false),
        });
        onFormComplete(fieldValues.name);
    };

    const handleCancel = () => {
        setToken(undefined);
        onDialogCancel();
    };

    return (
        <DialogForm
            id='generate-credentials'
            isOpen={isDialogOpen}
            title='Generate New Credentials'
            description='Who or what are these credentials for?'
            cancelButtonLabel={hasResult ? 'Close' : 'Cancel'}
            onCancel={handleCancel}
            confirmBtnText='Generate Token'
            onConfirm={handleGenerate}
            hideSubmitButton={hasResult}
            isLoading={isLoading}
            formInitialValues={{
                name: '',
                description: '',
                access: ServiceAccountAccess.Read,
            }}
            sx={{ width: 600 }}
        >
            <GenerateCredentials hasResult={hasResult} />
            {hasResult && <GeneratedCredentialsSection token={token} />}
        </DialogForm>
    );
};
