// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo, useReducer, useState } from 'react';

import { DataGridPro } from '@mui/x-data-grid-pro';

import { dataGridDefaultProps, DataGridWrapper } from '@dolittle/design-system';

import { KafkaServiceAccountListDto } from '../../../../../../../apis/integrations/generated';

import { ServiceAccountsDataGridToolbar } from './dataGridToolbar';
import { serviceAccountsDataGridColumns } from './ServiceAccountsDataGridColumns';

import { ViewCertificateDialog } from './viewCredentials/ViewCertificateDialog';
import { ViewKeyDialog } from './viewCredentials/ViewKeyDialog';
import { viewCredentialsDialogReducer } from './viewCredentials/viewCredentialsDialogReducer';

export type ServiceAccountsDataGridProps = {
    connectionId: string;
    isLoading: boolean;
    serviceAccountsDataGridRows: KafkaServiceAccountListDto[];
};

export const ServiceAccountsDataGrid = ({ connectionId, isLoading, serviceAccountsDataGridRows }: ServiceAccountsDataGridProps) => {
    const [viewCertificateDialogState, viewCertificateDialogDispatch] = useReducer(viewCredentialsDialogReducer, { isOpen: false, connectionId });
    const [viewKeyDialogState, viewKeyDialogDispatch] = useReducer(viewCredentialsDialogReducer, { isOpen: false, connectionId });

    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleCertificateView = (serviceAccount: KafkaServiceAccountListDto) => {
        viewCertificateDialogDispatch({ type: 'open', payload: { serviceAccountName: serviceAccount.serviceAccountName! } });
    };

    const handleKeyView = (serviceAccount: KafkaServiceAccountListDto) => {
        viewKeyDialogDispatch({ type: 'open', payload: { serviceAccountName: serviceAccount.serviceAccountName! } });
    };

    const columns = useMemo(() => serviceAccountsDataGridColumns(handleCertificateView, handleKeyView), [handleCertificateView, handleKeyView]);

    return (
        <>
            <ViewCertificateDialog dialogState={viewCertificateDialogState} dispatch={viewCertificateDialogDispatch} />
            <ViewKeyDialog dialogState={viewKeyDialogState} dispatch={viewKeyDialogDispatch} />

            <DataGridWrapper background='dark'>
                <DataGridPro
                    {...dataGridDefaultProps}
                    rows={serviceAccountsDataGridRows}
                    columns={columns}
                    loading={isLoading}
                    getRowId={row => row.serviceAccountName}
                    checkboxSelection
                    onSelectionModelChange={model => setSelectedIds(model as string[])}
                    components={{
                        Toolbar: () => <ServiceAccountsDataGridToolbar connectionId={connectionId} selectedRowIds={selectedIds} />,
                    }}
                />
            </DataGridWrapper>
        </>
    );
};
