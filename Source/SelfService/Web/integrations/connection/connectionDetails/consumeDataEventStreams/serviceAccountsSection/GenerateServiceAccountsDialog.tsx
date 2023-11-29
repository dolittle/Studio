// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

import { FormDialog, Input, Select } from '@dolittle/design-system';

import { useConnectionsIdKafkaServiceAccountsServiceAccountNamePost } from '../../../../../apis/integrations/kafkaServiceAccountApi.hooks';
import { AccountAccess, KafkaServiceAccountCreatedDto, ResponseError } from '../../../../../apis/integrations/generated';
import { CACHE_KEYS } from '../../../../../apis/integrations/CacheKeys';

export type GenerateKafkaServiceAccountFormParameters = {
    name: string;
    description: string;
    access: AccountAccess;
};

const accessOptions = [
    { displayValue: 'Read', value: AccountAccess.Read },
    { displayValue: 'Read & Write', value: AccountAccess.ReadWrite },
    { displayValue: 'Debug', value: AccountAccess.Debug },
];

export type GenerateServiceAccountFormProps = {
    connectionId: string;
    isDialogOpen: boolean;
    onDialogClose(): void;
};

export const GenerateServiceAccountDialog = ({ connectionId, isDialogOpen, onDialogClose }: GenerateServiceAccountFormProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const generateServiceAccountMutation = useConnectionsIdKafkaServiceAccountsServiceAccountNamePost();

    const [isGeneratingServiceAccount, setIsGeneratingServiceAccount] = useState(false);

    const handleGenerateServiceAccount = ({ name, description, access }: GenerateKafkaServiceAccountFormParameters) => {
        setIsGeneratingServiceAccount(true);

        generateServiceAccountMutation.mutate({
            id: connectionId,
            serviceAccountName: name,
            description,
            access,
        }, {
            onSuccess: (data: KafkaServiceAccountCreatedDto) => {
                window.setTimeout(() => {
                    queryClient.invalidateQueries([CACHE_KEYS.ConnectionKafkaServiceAccounts_GET, connectionId]);
                    enqueueSnackbar(`Service account '${data.serviceAccountName}' created.`);
                }, 200);
            },
            onError: async (error) => {
                let message = 'Error while generating service account.';
                if (error instanceof ResponseError) {
                    if (error.response.body) {
                        const body = await error.response.text();
                        message = `${message} error: ${body}`;
                    }
                }
                enqueueSnackbar(message, { variant: 'error' });
            },
            onSettled: () => {
                onDialogClose();
                setIsGeneratingServiceAccount(false);
            },
        });
    };

    return (
        <FormDialog
            id='generate-service-account'
            isOpen={isDialogOpen}
            title='Generate New Service Account'
            description='Who or what are these credentials for?'
            isLoading={isGeneratingServiceAccount}
            onCancel={onDialogClose}
            submitBtnLabel='Generate Service Account'
            onSubmit={handleGenerateServiceAccount}
            formInitialValues={{
                name: '',
                description: '',
                access: AccountAccess.Read,
            } as GenerateKafkaServiceAccountFormParameters}
        >
            <Input id='name' label='Name' required />
            <Input id='description' label='Description' />
            <Select id='access' label='Access' options={accessOptions} />
        </FormDialog>
    );
};
