// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState, useRef } from 'react';

import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

import { Box, FormHelperText, Typography } from '@mui/material';

import { Button, Form, FormRef, Input, MaxWidthTextBlock } from '@dolittle/design-system';

// import { useConnectionsIdServiceAccountsServiceAccountNamePost } from '../../../../../apis/integrations/serviceAccountApi.hooks';
import { ResponseError, ServiceAccountCreatedDto } from '../../../../../apis/integrations/generated';
import { CACHE_KEYS } from '../../../../../apis/integrations/CacheKeys';

import { GenerateServiceAccountFormSubmitButton } from './GenerateServiceAccountFormSubmitButton';

export type GenerateServiceAccountFormParameters = {
    name: string;
};

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
    const formRef = useRef<FormRef<GenerateServiceAccountFormParameters>>(null);

    const [token, setToken] = useState<string | undefined>(undefined);
    const [formSubmitError, setFormSubmitError] = useState<string | undefined>(undefined);

    // const generateTokenMutation = useConnectionsIdServiceAccountsServiceAccountNamePost();
    const hasResult = !!token;

    const handleTokenCopy = () => {
        navigator.clipboard.writeText(token || '');
        enqueueSnackbar('Token copied to clipboard.');
    };

    const handleGenerate = (fieldValues: GenerateServiceAccountFormParameters) => {
        setFormSubmitError(undefined);
        // generateTokenMutation.mutate({
        //     id: props.connectionId,
        //     serviceAccountName: fieldValues.name,
        // }, {
        //     onSuccess: (data: ServiceAccountCreatedDto) => {
        //         setToken(data.token);
        //         formRef.current?.setValue('token', data.token);
        //         queryClient.invalidateQueries([CACHE_KEYS.ConnectionServiceAccounts_GET, props.connectionId]);
        //     },
        //     onError: async (error) => {
        //         let message = `Error while generating token.`;
        //         if (error instanceof ResponseError) {
        //             if (error.response.body) {
        //                 const body = await error.response.text();
        //                 message = `${message} error: ${body}`;
        //             }
        //         }
        //         setFormSubmitError(message);
        //         enqueueSnackbar(message, { variant: 'error' });
        //     }
        // });
        setToken('token');
        props.onFormComplete(fieldValues.name);
    };
    const resetForm = () => {
        setFormSubmitError(undefined);
        setToken(undefined);
        formRef.current?.reset();
    };

    useEffect(() => {
        if (props.resetForm) {
            resetForm();
        }
    }, [props.resetForm]);

    return (
        <>
            <Form<GenerateServiceAccountFormParameters>
                initialValues={{
                    name: '',
                }}
                onSubmit={handleGenerate}
                fRef={formRef}
            >
                <Box>
                    <MaxWidthTextBlock sx={{ mb: 3 }}>
                        Who or what is the service account for?
                    </MaxWidthTextBlock>
                    <Box
                        display='flex'
                        gap={1}
                        sx={{ mb: 6 }}
                    >
                        <Input id='name' label='Name' required disabled={hasResult && !formSubmitError} sx={{ mr: 10 }} />
                    </Box>
                    <Box display='flex' justifyContent='flex-end'>
                        {props.canCancel && <Button
                            label='Cancel'
                            sx={{ mr: 6 }}
                            onClick={() => props.onFormCancelled()}
                        />}
                        <GenerateServiceAccountFormSubmitButton disabled={hasResult} />
                    </Box>
                </Box>
            </Form>
        </>
    );
};
