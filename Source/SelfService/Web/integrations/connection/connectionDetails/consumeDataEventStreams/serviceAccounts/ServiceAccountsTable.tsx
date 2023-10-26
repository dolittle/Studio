// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';

import { Paper } from '@mui/material';
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';

import { Button, StatusIndicator } from '@dolittle/design-system';

import { KafkaServiceAccountListDto } from '../../../../../apis/integrations/generated';

import { formatDate } from '../../../../../utils/helpers/dates';

export type ServiceAccountsTableProps = {
    items: KafkaServiceAccountListDto[];
    isLoading: boolean;
    onViewCertificate: (serviceAccount: KafkaServiceAccountListDto) => void;
    onViewKey: (serviceAccount: KafkaServiceAccountListDto) => void;
    onSelectionChanged: (selection: string[]) => void;
};

export const ServiceAccountsTable = ({ items, isLoading, onViewCertificate, onViewKey, onSelectionChanged }: ServiceAccountsTableProps) => {
    const columns: GridColDef<KafkaServiceAccountListDto>[] = useMemo(() => [
        {
            field: 'serviceAccountName',
            headerName: 'Name',
            minWidth: 120,
            flex: 1,
        },
        {
            field: 'description',
            headerName: 'Description',
            minWidth: 250,
            flex: 1,
        },
        {
            field: 'certificates',
            headerName: 'Certificates',
            minWidth: 300,
            sortable: false,
            flex: 1,
            renderCell: params => (
                <>
                    <Button variant='outlined' label='View Certificate' onClick={() => onViewCertificate(params.row)} sx={{ mr: 2 }} />
                    <Button variant='outlined' label='View Key' onClick={() => onViewKey(params.row)} />
                </>
            ),
        },
        {
            field: 'createdAt',
            headerName: 'Created at',
            minWidth: 100,
            flex: 1,
            valueFormatter: params => params.value ? formatDate(params.value) : '-',
            renderCell: params => <span title={params.value?.toISOString()}>{params.formattedValue}</span>,
        },
        {
            field: 'certificateExpiry',
            headerName: 'Certificate Validity',
            minWidth: 100,
            flex: 1,
            renderCell: params => {
                const isValid = params.value > Date.now();

                return (
                    <>
                        {params.value
                            ? <span title={params.value.toISOString()}>
                                <StatusIndicator status={isValid ? 'success' : 'error'} label={isValid ? 'Up to date' : 'Expired'} />
                            </span>
                            : '-'
                        }
                    </>
                );
            },
        },
    ], [onViewCertificate, onViewKey]);

    return (
        <Paper sx={{ width: 1 }}>
            <DataGridPro
                rows={items}
                columns={columns}
                autoHeight
                disableSelectionOnClick
                disableColumnMenu
                disableColumnReorder
                disableColumnResize
                disableColumnSelector
                disableMultipleSelection
                checkboxSelection
                getRowHeight={() => 'auto'}
                headerHeight={46}
                hideFooter
                loading={isLoading}
                getRowId={row => row.serviceAccountName!}
                onSelectionModelChange={model => onSelectionChanged(model as string[])}
            />
        </Paper>
    );
};
