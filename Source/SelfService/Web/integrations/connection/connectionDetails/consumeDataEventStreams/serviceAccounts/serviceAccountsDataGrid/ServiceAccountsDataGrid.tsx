// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';

import { DataGridPro } from '@mui/x-data-grid-pro';

import { Button, DataGridCustomToolbar, dataGridDefaultProps, DataGridWrapper } from '@dolittle/design-system';

import { KafkaServiceAccountListDto } from '../../../../../../apis/integrations/generated';

import { serviceAccountsDataGridColumns } from './ServiceAccountsDataGridColumns';

export type ServiceAccountsDataGridProps = {
    serviceAccountsDataGridRows: KafkaServiceAccountListDto[];
    isLoading: boolean;
    onServiceAccountCreate: () => void;
    onServiceAccountDelete: () => void;
    onViewCertificate: (serviceAccount: KafkaServiceAccountListDto) => void;
    onViewKey: (serviceAccount: KafkaServiceAccountListDto) => void;
    onSelectionChanged: (selection: string[]) => void;
};

export const ServiceAccountsDataGrid = ({ serviceAccountsDataGridRows, isLoading, onServiceAccountCreate, onServiceAccountDelete, onViewCertificate, onViewKey, onSelectionChanged }: ServiceAccountsDataGridProps) => {
    const columns = useMemo(() => serviceAccountsDataGridColumns(onViewCertificate, onViewKey), [onViewCertificate, onViewKey]);

    return (
        <DataGridWrapper background='dark'>
            <DataGridPro
                {...dataGridDefaultProps}
                rows={serviceAccountsDataGridRows}
                columns={columns}
                loading={isLoading}
                getRowId={row => row.serviceAccountName}
                checkboxSelection
                onSelectionModelChange={model => onSelectionChanged(model as string[])}
                components={{
                    Toolbar: () => (
                        <DataGridCustomToolbar title='Your Service Accounts'>
                            <Button label='Generate New Service Account' startWithIcon='AddCircle' onClick={onServiceAccountCreate} />
                            <Button label='Delete Service Accounts' color='error' startWithIcon='DeleteRounded' onClick={onServiceAccountDelete} />
                        </DataGridCustomToolbar>
                    ),
                }}
            />
        </DataGridWrapper>
    );
};
