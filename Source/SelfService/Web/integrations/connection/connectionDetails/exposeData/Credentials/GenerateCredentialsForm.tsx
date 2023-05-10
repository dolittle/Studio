// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState, useRef } from 'react';
import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

import { Box, Collapse, FormHelperText, Grid, TextField, Typography, Paper } from '@mui/material';
import { AlertBox, Button, ContentSection, Form, FormRef, Input, MaxWidthTextBlock } from '@dolittle/design-system';
import { useConnectionsIdServiceAccountsServiceAccountNamePost } from '../../../../../apis/integrations/serviceAccountApi.hooks';
import { ResponseError, ServiceAccountCreatedDto } from '../../../../../apis/integrations/generated';
import { CACHE_KEYS } from '../../../../../apis/integrations/CacheKeys';

export type GenerateCredentialsFormParameters = {
    name: string;
    description?: string;
    token?: string;
};

export type GenerateCredentialsFormProps = {
    resetForm: boolean;
    connectionId: string;
    onFormComplete: (tokenName: string) => void;
};

export const GenerateCredentialsForm = (props: GenerateCredentialsFormProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const [token, setToken] = useState<string | undefined>(undefined);
    const [formSubmitError, setFormSubmitError] = useState<string | undefined>(undefined);
    const queryClient = useQueryClient();
    const formRef = useRef<FormRef<GenerateCredentialsFormParameters>>(null);

    const generateTokenMutation = useConnectionsIdServiceAccountsServiceAccountNamePost();
    const hasResult = !!token;

    const handleTokenCopy = () => {
        navigator.clipboard.writeText(token || '');
        enqueueSnackbar('Token copied to clipboard.');
    };

    const handleGenerate = (fieldValues: GenerateCredentialsFormParameters) => {
        setFormSubmitError(undefined);
        generateTokenMutation.mutate({
            id: props.connectionId,
            serviceAccountName: fieldValues.name,
            description: fieldValues.description
        }, {
            onSuccess: (data: ServiceAccountCreatedDto) => {
                setToken(data.token);
                formRef.current?.setValue('token', data.token);
                queryClient.invalidateQueries([CACHE_KEYS.ConnectionServiceAccounts_GET, props.connectionId]);
            },
            onError: async (error) => {
                let message = `Error while generating token.`;
                if (error instanceof ResponseError) {
                    if (error.response.body) {
                        const body = await error.response.text();
                        message = `${message} error: ${body}`;
                    }
                }
                //TODO: Pav - use a snack bar instead of an alert box
                setFormSubmitError(message);
            }
        });
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
            <Form<GenerateCredentialsFormParameters>
                initialValues={{
                    name: '',
                    description: '',
                    token: ''
                }}
                onSubmit={handleGenerate}
                fRef={formRef}
            >

                <Paper elevation={3} sx={{ py: 3, px: 1.25 }}>
                    <Box>
                        <MaxWidthTextBlock sx={{ mb: 3 }}>
                            The token will only be visible one time after you generate it, so please make sure to copy it. Who or what are these credentials for?
                        </MaxWidthTextBlock>
                        <Box
                            display='flex'
                            gap={1}
                            sx={{ mb: 6 }}
                        >
                            <Input id='name' label='Name' required disabled={hasResult && !formSubmitError} sx={{ mr: 10 }} />
                            <Input id='description' label='Description' disabled={hasResult && !formSubmitError} />
                        </Box>
                        <Box display='flex' justifyContent='flex-end'>
                            <Button label='Cancel' sx={{mr: 6}}/>
                            <Button label='Generate Token' type='submit' variant='outlined'/>
                        </Box>

                        {/* <Typography>Credential Token</Typography>
                        <Box sx={{ mt: 2 }}>
                            <Input
                                id='token'
                                label='Token'
                                // disabled
                                sx={{ width: 375 }}
                            />
                            <Button
                                label='Copy Token'
                                startWithIcon='CopyAllRounded'
                                onClick={handleTokenCopy}
                                sx={{ ml: 3 }}
                            />
                        </Box>
                        <FormHelperText sx={{ ml: 1.75 }}>This bearer token should be used in the request header.</FormHelperText> */}
                    </Box>
                    {/* <Grid container spacing={3} sx={{ pb: 5 }}>
                        <Grid item>
                            <Typography sx={{ mb: 2 }}>Who or what are these credentials for?</Typography>
                            <Input id='name' label='Name' required disabled={hasResult && !formSubmitError} />
                            <Input id='description' label='Description' disabled={hasResult && !formSubmitError} />
                        </Grid>

                        {!hasResult || formSubmitError
                            ? (
                                <>
                                    <Grid item>
                                        {formSubmitError && (<AlertBox message={`${formSubmitError}`} />)}
                                        <Button label='Generate Token' type='submit' />
                                    </Grid>
                                </>
                            )
                            : (
                                <>
                                    <Grid item>
                                        <Typography sx={{ mb: 2 }}>Credential Token</Typography>
                                        <Input
                                            id='token'
                                            label='Token'
                                            disabled
                                            sx={{ width: 400 }}
                                        />
                                        <FormHelperText>This bearer token should be used in the request header.</FormHelperText>
                                    </Grid>
                                    <Grid item>
                                        <Button label='Copy Token' startWithIcon='CopyAllRounded' onClick={handleTokenCopy} />
                                    </Grid>
                                </>
                            )}
                    </Grid> */}
                </Paper >
            </Form >
        </>
    );
};
