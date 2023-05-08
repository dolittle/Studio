// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useMemo, useState, useReducer } from 'react';
import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

import { Collapse, FormHelperText, Grid, TextField, Typography } from '@mui/material';
import { AlertBox, Button, ContentSection } from '@dolittle/design-system';
import {
    useConnectionsIdServiceAccountsGet,
    useConnectionsIdServiceAccountsServiceAccountNameDelete
} from '../../../../../apis/integrations/serviceAccountApi.hooks';
import { useConnectionId } from '../../../../../integrations/routes.hooks';
import { CACHE_KEYS } from '../../../../../apis/integrations/CacheKeys';
import { CredentialsList } from './CredentialsList';
import { GenerateCredentialsForm } from './GenerateCredentialsForm';
import { DeleteCredentialDialog, DeleteCredentialDialogState, deleteCredentialDialogReducer } from './DeleteCredentialDialog';

export type CredentialsSectionProps = {};

export const CredentialsSection = (props: CredentialsSectionProps) => {
    const [openCredentials, setOpenCredentials] = useState(false);
    const [activeCredential, setActiveCredential] = useState<string | undefined>(undefined);
    const [allowGenerateNewCredentials, setAllowGenerateNewCredentials] = useState(true);
    const [resetForm, setResetForm] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const connectionId = useConnectionId();
    if (!connectionId) {
        return <AlertBox />;
    }
    const [deleteDialogState, deleteDialogDispatch] = useReducer(deleteCredentialDialogReducer, { open: false, credentialName: '', connectionId });

    const queryClient = useQueryClient();
    const { data, isLoading, isError, error } = useConnectionsIdServiceAccountsGet({ id: connectionId });
    const deleteMutation = useConnectionsIdServiceAccountsServiceAccountNameDelete();

    const credentials = useMemo(
        () => data?.filter(credential => credential.serviceAccountName !== activeCredential) || [],
        [data, activeCredential]
    );

    const handleTokenGenerated = (tokenName: string) => {
        setActiveCredential(tokenName);
        setAllowGenerateNewCredentials(true);
    };

    const handleGenerateNewCredentials = () => {
        setActiveCredential(undefined);
        setAllowGenerateNewCredentials(false);
        setOpenCredentials(true);
        setResetForm(true);
    };

    const onDelete = (serviceAccountName: string) => {
        deleteDialogDispatch({ type: 'setCredential', payload: serviceAccountName });
        deleteDialogDispatch({ type: 'open' });
    };
    const handleDelete = (serviceAccountName: string) => {
        deleteMutation.mutate(
            { id: connectionId, serviceAccountName },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries([CACHE_KEYS.ConnectionServiceAccounts_GET, connectionId]);
                    deleteDialogDispatch({ type: 'close' });
                    enqueueSnackbar('Credentials successfully deleted', { variant: 'success' });
                }, onError: (error) => {
                    enqueueSnackbar('Credentials failed to delete', { variant: 'error' });
                }
            }
        );
    };

    useEffect(() => {
        //TODO: Pav - no like this
        if (resetForm) {
            setResetForm(false);
        }
    }, [resetForm]);

    if (isError) {
        return <AlertBox message={`Error while fetching credentials list. ${error}`} />;
    }



    return (
        <ContentSection
            title='Credentials'
            headerProps={{
                buttons: [
                    {
                        label: 'Generate New Credentials',
                        variant: 'outlined',
                        onClick: handleGenerateNewCredentials,
                        disabled: !allowGenerateNewCredentials
                    }
                ]
            }}
        >
            <DeleteCredentialDialog
                dialogState={deleteDialogState}
                dispatch={deleteDialogDispatch}
                handleDelete={handleDelete}
            />
            <Collapse in={openCredentials}>
                <GenerateCredentialsForm resetForm={resetForm} connectionId={connectionId} onFormComplete={handleTokenGenerated} />
            </Collapse>
            <CredentialsList credentials={credentials} onDelete={onDelete} />
        </ContentSection>
    );
};
