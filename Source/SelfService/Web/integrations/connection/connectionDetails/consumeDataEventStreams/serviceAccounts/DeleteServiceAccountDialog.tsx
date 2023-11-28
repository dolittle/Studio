// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

import { Typography } from '@mui/material';

import { Dialog } from '@dolittle/design-system/';

import { useConnectionsIdKafkaServiceAccountsServiceAccountNameDelete } from '../../../../../apis/integrations/kafkaServiceAccountApi.hooks';
import { CACHE_KEYS } from '../../../../../apis/integrations/CacheKeys';

export type DeleteServiceAccountDialogProps = {
    connectionId: string;
    selectedRowIds: string[];
    isDialogOpen: boolean;
    onDialogClose: () => void;
};

export const DeleteServiceAccountDialog = ({ connectionId, selectedRowIds, isDialogOpen, onDialogClose }: DeleteServiceAccountDialogProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const deleteMutation = useConnectionsIdKafkaServiceAccountsServiceAccountNameDelete();

    const [isDeletingServiceAccounts, setIsDeletingServiceAccounts] = useState(false);

    const handleServiceAccountDelete = (serviceAccounts: string[]) => {
        setIsDeletingServiceAccounts(true);
        const deleteMutations = serviceAccounts.map(id => deleteMutation.mutateAsync({ id: connectionId, serviceAccountName: id }));

        Promise.allSettled(deleteMutations)
            .then(results => {
                results.forEach((result, index) => {
                    const id = serviceAccounts[index];
                    if (result.status === 'fulfilled') {
                        enqueueSnackbar(`Successfully deleted service account '${id}'.`);
                    } else {
                        enqueueSnackbar(`Failed to delete service account '${id}': ${result.reason}.`, { variant: 'error' });
                    }
                });
                queryClient.invalidateQueries([CACHE_KEYS.ConnectionKafkaServiceAccounts_GET, connectionId]);
            })
            .finally(() => {
                onDialogClose();
                setIsDeletingServiceAccounts(false);
            });
    };

    const hasMany = selectedRowIds.length > 1;

    return (
        <Dialog
            id='delete-service-account'
            isOpen={isDialogOpen}
            title={`Delete service account${hasMany ? 's' : ''}`}
            description={`Are you sure you want to delete the selected service account${hasMany ? 's' : ''}?`}
            isLoading={isDeletingServiceAccounts}
            onCancel={onDialogClose}
            confirmBtnLabel='Delete'
            confirmBtnColor='error'
            onConfirm={() => handleServiceAccountDelete(selectedRowIds)}
        >
            {selectedRowIds.map(row => <Typography key={row}>{`"${row}"`}</Typography>)}
        </Dialog>
    );
};
