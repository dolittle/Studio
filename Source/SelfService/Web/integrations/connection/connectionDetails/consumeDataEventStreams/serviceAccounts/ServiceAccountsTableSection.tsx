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
    const [deleteDialogState, deleteDialogDispatch] = useReducer(deleteServiceAccountDialogReducer, { open: false, serviceAccount: '', connectionId, isLoading: false });

    const deleteMutation = useConnectionsIdKafkaServiceAccountsServiceAccountNameDelete();

    const tableActionEnabled = selectedIds.length > 0;

    const handleDelete = () => {
        deleteDialogDispatch({ type: 'loading', payload: { isLoading: true } });
        selectedIds.forEach(id => {
            deleteMutation
                .mutate(
                    { id: connectionId, serviceAccountName: id },
                    {
                        onSuccess: () => {
                            enqueueSnackbar(`Successfully deleted service account ${id}`, { variant: 'success' });
                            queryClient.invalidateQueries([CACHE_KEYS.ConnectionKafkaServiceAccounts_GET, connectionId]);
                        },
                        onError: (error) => enqueueSnackbar(`Failed to delete service account ${id}: ${error}`, { variant: 'error' }),
                        onSettled: () => deleteDialogDispatch({ type: 'close' })
                    }
                );
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
                        onClick: () => deleteDialogDispatch({ type: 'open', payload: { serviceAccount: selectedIds[0] } })
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

