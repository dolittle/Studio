// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

import { Typography } from '@mui/material';

import { AlertDialog } from '@dolittle/design-system/';

import { CACHE_KEYS } from '../../../../../../apis/integrations/CacheKeys';
import { useConnectionsIdServiceAccountsServiceAccountNameDelete } from '../../../../../../apis/integrations/serviceAccountApi.hooks';

export type DeleteCredentialsDialogProps = {
    connectionId: string;
    isDialogOpen: boolean;
    credentialsToDelete: string[];
    onDialogCancel: () => void;
};

export const DeleteCredentialsDialog = ({ connectionId, isDialogOpen, credentialsToDelete, onDialogCancel }: DeleteCredentialsDialogProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const deleteMutation = useConnectionsIdServiceAccountsServiceAccountNameDelete();

    const hasMany = credentialsToDelete.length > 1;

    const handleDelete = (credentials: string[]) => {
        const deleteMutations = credentials.map(id => deleteMutation.mutateAsync({ id: connectionId, serviceAccountName: id }));

        Promise.allSettled(deleteMutations)
            .then(results => {
                results.forEach((result, index) => {
                    const id = credentials[index];
                    if (result.status === 'fulfilled') {
                        enqueueSnackbar(`Credentials '${id}' successfully deleted.`);
                    } else {
                        enqueueSnackbar(`Failed to delete credentials '${id}': ${result.reason}.`, { variant: 'error' });
                    }
                });
                queryClient.invalidateQueries([CACHE_KEYS.ConnectionServiceAccounts_GET, connectionId]);
            })
            .finally(onDialogCancel);
    };

    return (
        <AlertDialog
            id='delete-credentials'
            isOpen={isDialogOpen}
            title={`Delete credential${hasMany ? 's' : ''}`}
            description={`Are you sure you want to delete the selected credential${hasMany ? 's' : ''}? This action cannot be undone and will impact any applications currently using these credentials.`}
            confirmBtnText='Delete'
            confirmBtnColor='error'
            onCancel={onDialogCancel}
            onConfirm={() => handleDelete(credentialsToDelete)}
        //isLoading={isLoading}
        >
            {credentialsToDelete.map(serviceAccount => <Typography key={serviceAccount} gutterBottom>{`"${serviceAccount}"`}</Typography>)}
        </AlertDialog>
    );
};
