// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useRef, useState } from 'react';

import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

import { Box } from '@mui/material';

import { Button, Form, FormRef, Input, MaxWidthTextBlock, Select } from '@dolittle/design-system';

import { useConnectionsIdKafkaServiceAccountsGet, useConnectionsIdKafkaServiceAccountsServiceAccountNamePost } from '../../../../../apis/integrations/kafkaServiceAccountApi.hooks';
import { AccountAccess, KafkaServiceAccountCreatedDto, ResponseError, ServiceAccountCreatedDto } from '../../../../../apis/integrations/generated';
import { CACHE_KEYS } from '../../../../../apis/integrations/CacheKeys';

import { GenerateServiceAccountFormSubmitButton } from './GenerateServiceAccountFormSubmitButton';

export type GenerateKafkaServiceAccountFormParameters = {
    name: string;
    description?: string;
    access?: AccountAccess;
};

const accessOptions = [
    { displayValue: 'Default', value: '' },
    { displayValue: 'Read', value: AccountAccess.Read },
    { displayValue: 'Read & Write', value: AccountAccess.ReadWrite },
    { displayValue: 'Debug', value: AccountAccess.Debug }
];

export type GenerateServiceAccountFormProps = {
    resetForm: boolean;
    connectionId: string;
    onFormComplete(tokenName: string): void;
    onFormCancelled(): void;
    canCancel: boolean;
};

export const GenerateServiceAccountForm = (props: GenerateServiceAccountFormProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const formRef = useRef<FormRef<GenerateKafkaServiceAccountFormParameters>>(null);

    const [token, setToken] = useState<string | undefined>(undefined);
    const [formSubmitError, setFormSubmitError] = useState<string | undefined>(undefined);

    //const serviceAccountsQuery = useConnectionsIdKafkaServiceAccountsGet({ id: props.connectionId });
    const generateServiceAccountMutation = useConnectionsIdKafkaServiceAccountsServiceAccountNamePost();
    const hasResult = !!token;

    const handleGenerate = (fieldValues: GenerateKafkaServiceAccountFormParameters) => {
        setFormSubmitError(undefined);

        generateServiceAccountMutation.mutate({
            id: props.connectionId,
            serviceAccountName: fieldValues.name,
            description: fieldValues.description,
            access: fieldValues.access ?? undefined,
        }, {
            onSuccess: (data: KafkaServiceAccountCreatedDto) => {
                window.setTimeout(() => {
                    props.onFormComplete(data.serviceAccountName!);
                    queryClient.invalidateQueries([CACHE_KEYS.ConnectionKafkaServiceAccounts_GET, props.connectionId]);
                    enqueueSnackbar(`Service account ${data.serviceAccountName} created.`);
                }, 200);
            },
            onError: async (error) => {
                let message = `Error while generating service account.`;
                if (error instanceof ResponseError) {
                    if (error.response.body) {
                        const body = await error.response.text();
                        message = `${message} error: ${body}`;
                    }
                }
                setFormSubmitError(message);
                enqueueSnackbar(message, { variant: 'error' });
            }
        });
    };

    const resetForm = () => {
        setFormSubmitError(undefined);
        setToken(undefined);
        formRef.current?.reset();
    };

    useEffect(() => {
        if (props.resetForm) resetForm();
    }, [props.resetForm]);

    return (
        <Form<GenerateKafkaServiceAccountFormParameters>
            initialValues={{
                name: '',
            }}
            onSubmit={handleGenerate}
            fRef={formRef}
        >
            <MaxWidthTextBlock sx={{ mb: 3 }}>Who or what is the service account for?</MaxWidthTextBlock>

            <Box sx={{ mb: 6, display: 'flex', gap: 1 }}>
                <Input id='name' label='Name' required disabled={hasResult && !formSubmitError} sx={{ mr: 10 }} />
                <Input id='description' label='Description' disabled={hasResult && !formSubmitError} sx={{ mr: 10 }} />
                <Select id='access' label='Access' options={accessOptions} />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {props.canCancel && <Button label='Cancel' onClick={() => props.onFormCancelled()} sx={{ mr: 6 }} />}
                <GenerateServiceAccountFormSubmitButton disabled={hasResult} />
            </Box>
        </Form>
    );
};
