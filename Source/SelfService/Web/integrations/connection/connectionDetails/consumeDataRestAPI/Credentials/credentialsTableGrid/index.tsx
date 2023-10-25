// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useReducer, useState } from 'react';

import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

import { DataGridPro } from '@mui/x-data-grid-pro';

import { Button, DataGridCustomToolbar, DataGridWrapper, dataGridDefaultProps } from '@dolittle/design-system';

import { ServiceAccountListDto } from '../../../../../../apis/integrations/generated';
import { CACHE_KEYS } from '../../../../../../apis/integrations/CacheKeys';
import { useConnectionsIdServiceAccountsServiceAccountNameDelete } from '../../../../../../apis/integrations/serviceAccountApi.hooks';

import { CredentialsDataGridColumns } from './CredentialsDataGridColumns';
import { DeleteCredentialsDialog, deleteCredentialsDialogReducer } from './DeleteCredentialsDialog';

export type CredentialsTableGridIndexProps = {
    credentials: ServiceAccountListDto[];
    isLoading: boolean;
    connectionId: string;
};

export const CredentialsTableGridIndex = ({ credentials, isLoading, connectionId }: CredentialsTableGridIndexProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const deleteMutation = useConnectionsIdServiceAccountsServiceAccountNameDelete();
    const [deleteDialogState, deleteDialogDispatch] = useReducer(deleteCredentialsDialogReducer, { open: false, credentials: [], connectionId, isLoading: false });

    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleDelete = (credentials: string[]) => {
        deleteDialogDispatch({ type: 'loading', payload: { isLoading: true } });
        const deleteMutations = credentials.map(id => deleteMutation.mutateAsync({ id: connectionId, serviceAccountName: id }));

        Promise.allSettled(deleteMutations)
            .then(results => {
                results.forEach((result, index) => {
                    const id = credentials[index];
                    if (result.status === 'fulfilled') {
                        enqueueSnackbar(`Credential '${id}' successfully deleted.`);
                    } else {
                        enqueueSnackbar(`Failed to delete credential '${id}': ${result.reason}.`, { variant: 'error' });
                    }
                });
                queryClient.invalidateQueries([CACHE_KEYS.ConnectionServiceAccounts_GET, connectionId]);
            })
            .finally(() => deleteDialogDispatch({ type: 'close' }));
    };

    const Toolbar = () => {
        return (
            <DataGridCustomToolbar title='Your credentials'>
                <Button label='Delete' color='error' startWithIcon='DeleteRounded' disabled={!selectedIds.length} onClick={() => deleteDialogDispatch({ type: 'open', payload: { credentials: selectedIds } })} />
            </DataGridCustomToolbar>
        );
    };

    return (
        <>
            <DeleteCredentialsDialog dispatch={deleteDialogDispatch} state={deleteDialogState} onDelete={handleDelete} />

            <DataGridWrapper background='dark'>
                <DataGridPro
                    {...dataGridDefaultProps}
                    rows={credentials}
                    columns={CredentialsDataGridColumns}
                    loading={isLoading}
                    getRowId={row => row.serviceAccountName!}
                    checkboxSelection
                    onSelectionModelChange={model => setSelectedIds(model as string[])}
                    components={{
                        Toolbar,
                    }}
                />
            </DataGridWrapper>
        </>
    );
};
