// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useMemo, useState, useReducer } from 'react';
import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

import { Collapse } from '@mui/material';

import { AlertBox, ContentContainer, ContentHeader, ContentSection } from '@dolittle/design-system';

import {
    useConnectionsIdServiceAccountsGet,
    useConnectionsIdServiceAccountsServiceAccountNameDelete
} from '../../../../../apis/integrations/serviceAccountApi.hooks';
import { CACHE_KEYS } from '../../../../../apis/integrations/CacheKeys';
import { useConnectionId } from '../../../../routes.hooks';

import { CredentialsList } from './CredentialsList';
import { GenerateCredentialsForm } from './GenerateCredentialsForm';
import { DeleteCredentialDialog, DeleteCredentialDialogState, deleteCredentialDialogReducer } from './DeleteCredentialDialog';

export type CredentialsContainerProps = {};

export const CredentialsContainer = (props: CredentialsContainerProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const connectionId = useConnectionId();
    const queryClient = useQueryClient();

    const [expandCredentials, setExpandCredentials] = useState(false);
    const [activeCredential, setActiveCredential] = useState<string | undefined>(undefined);
    const [resetForm, setResetForm] = useState(false);

    if (!connectionId) return <AlertBox />;

    const [deleteDialogState, deleteDialogDispatch] = useReducer(deleteCredentialDialogReducer, { open: false, credentialName: '', connectionId });

    const { data, isLoading, isError, error } = useConnectionsIdServiceAccountsGet({ id: connectionId });
    const deleteMutation = useConnectionsIdServiceAccountsServiceAccountNameDelete();

    const credentials = useMemo(
        () => data?.filter(credential => credential.serviceAccountName?.toLowerCase() !== activeCredential?.toLowerCase() || '')
            .sort((a, b) => b.createdAt! > a.createdAt! ? 1 : -1) || [],
        [data, activeCredential]
    );

    const allowGenerateNewCredentials = !expandCredentials || (expandCredentials && !!activeCredential);

    const handleTokenGenerated = (tokenName: string) => {
        setActiveCredential(tokenName);
    };

    const handleGenerateNewCredentials = () => {
        setActiveCredential(undefined);
        setResetForm(true);
        setExpandCredentials(true);
    };

    const handleFormCancelled = () => {
        if (credentials.length) {
            setExpandCredentials(false);
        }
        setResetForm(true);
    };

    useEffect(() => {
        if (expandCredentials && !isLoading) {
            setExpandCredentials(true);
        } else {
            const shouldExpand = !isLoading && (credentials.length === 0 || activeCredential !== undefined);
            setExpandCredentials(shouldExpand);
        }

    }, [credentials, activeCredential, expandCredentials, isLoading]);

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


    if (isError) return <AlertBox message={`Error while fetching credentials list. ${error}`} />;

    return (
        <ContentContainer>
            <ContentHeader
                title='Credentials'
                buttons={[
                    {
                        label: 'Generate New Credentials',
                        variant: 'outlined',
                        onClick: handleGenerateNewCredentials,
                        disabled: !allowGenerateNewCredentials
                    }
                ]}
            />
            <DeleteCredentialDialog
                dialogState={deleteDialogState}
                dispatch={deleteDialogDispatch}
                handleDelete={handleDelete}
            />
            <Collapse in={expandCredentials}>
                <ContentSection hideDivider={!expandCredentials} title='Generate New Credentials'>
                    <GenerateCredentialsForm
                        resetForm={resetForm}
                        connectionId={connectionId}
                        onFormComplete={handleTokenGenerated}
                        onFormCancelled={handleFormCancelled}
                        canCancel={credentials.length > 0}
                    />
                </ContentSection>
            </Collapse>
            {credentials.length > 0 && (
                <ContentSection title='Credentials Created'>
                    <CredentialsList credentials={credentials} onDelete={onDelete} />
                </ContentSection>
            )}
        </ContentContainer>
    );
};
