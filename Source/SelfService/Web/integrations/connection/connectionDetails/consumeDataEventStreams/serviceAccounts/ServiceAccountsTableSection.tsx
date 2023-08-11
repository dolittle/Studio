// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo, useReducer, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';
import { AlertDialog, ContentSection } from '@dolittle/design-system';
import { KafkaServiceAccountListDto } from '../../../../../apis/integrations/generated';
import { CACHE_KEYS } from '../../../../../apis/integrations/CacheKeys';
import { useConnectionsIdKafkaServiceAccountsServiceAccountNameDelete } from '../../../../../apis/integrations/kafkaServiceAccountApi.hooks';
import { ServiceAccountsTable } from './ServiceAccountsTable';
import { ViewCertificateDialog } from './ViewCertificateDialog';
import { ViewKeyDialog } from './ViewKeyDialog';
import { viewCredentialsDialogReducer } from './viewCredentialsDialogReducer';
import { DeleteServiceAccountDialog, deleteServiceAccountDialogReducer } from './DeleteServiceAccountDialog';


export type ServiceAccountsTableSectionProps = {
    items: KafkaServiceAccountListDto[];
    isLoading: boolean;
    connectionId: string;
};

export const ServiceAccountsTableSection = ({ items, isLoading, connectionId }: ServiceAccountsTableSectionProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [viewCertificateDialogState, viewCertificateDialogDispatch] = useReducer(viewCredentialsDialogReducer, { isOpen: false, connectionId });
    const [viewKeyDialogState, viewKeyDialogDispatch] = useReducer(viewCredentialsDialogReducer, { isOpen: false, connectionId });
    const [deleteDialogState, deleteDialogDispatch] = useReducer(deleteServiceAccountDialogReducer, { open: false, serviceAccounts: [], connectionId, isLoading: false });

    const deleteMutation = useConnectionsIdKafkaServiceAccountsServiceAccountNameDelete();

    const tableActionEnabled = selectedIds.length > 0;

    const handleDelete = (serviceAccounts: string[]) => {
        deleteDialogDispatch({ type: 'loading', payload: { isLoading: true } });
        const deleteMutations = serviceAccounts.map(id => deleteMutation.mutateAsync({ id: connectionId, serviceAccountName: id }));
        Promise.allSettled(deleteMutations)
            .then((results) => {
                results.forEach((result, index) => {
                    const id = serviceAccounts[index];
                    if (result.status === 'fulfilled') {
                        enqueueSnackbar(`Successfully deleted service account ${id}`);
                    } else {
                        enqueueSnackbar(`Failed to delete service account ${id}: ${result.reason}`, { variant: 'error' });
                    }
                });
                queryClient.invalidateQueries([CACHE_KEYS.ConnectionKafkaServiceAccounts_GET, connectionId]);
            }).finally(() => {
                deleteDialogDispatch({ type: 'close' });
            });
    };

    return (
        <ContentSection
            headerProps={{
                buttons: [
                    {
                        label: 'Delete',
                        startWithIcon: 'DeleteRounded',
                        disabled: !tableActionEnabled,
                        onClick: () => deleteDialogDispatch({ type: 'open', payload: { serviceAccounts: selectedIds } })
                    }
                ]
            }}
        >
            <ViewCertificateDialog dialogState={viewCertificateDialogState} dispatch={viewCertificateDialogDispatch} />
            <ViewKeyDialog dialogState={viewKeyDialogState} dispatch={viewKeyDialogDispatch} />
            <DeleteServiceAccountDialog
                dispatch={deleteDialogDispatch}
                state={deleteDialogState}
                onDelete={handleDelete}
            />
            <ServiceAccountsTable
                items={items}
                isLoading={isLoading}
                onSelectionChanged={setSelectedIds}
                onViewCertificate={
                    (account) => {
                        viewCertificateDialogDispatch({ type: 'open', payload: { serviceAccountName: account.serviceAccountName! } });
                    }
                }
                onViewKey={
                    (account) => {
                        viewKeyDialogDispatch({ type: 'open', payload: { serviceAccountName: account.serviceAccountName! } });
                    }
                }
            />
        </ContentSection>
    );
};

