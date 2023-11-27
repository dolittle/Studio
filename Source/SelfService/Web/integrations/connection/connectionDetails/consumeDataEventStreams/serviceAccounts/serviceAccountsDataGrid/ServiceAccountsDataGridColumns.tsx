// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { GridColDef } from '@mui/x-data-grid-pro';

import { Button, StatusIndicator } from '@dolittle/design-system';

import { KafkaServiceAccountListDto } from '../../../../../../apis/integrations/generated';

import { formatDate } from '../../../../../../utils/helpers/dates';

export const serviceAccountsDataGridColumns = (onViewCertificate: (serviceAccount: KafkaServiceAccountListDto) => void, onViewKey: (serviceAccount: KafkaServiceAccountListDto) => void) => {
    const CertificatesCell = (params) => {
        return (
            <>
                <Button variant='outlined' label='View Certificate' onClick={() => onViewCertificate(params.row)} sx={{ mr: 2 }} />
                <Button variant='outlined' label='View Key' onClick={() => onViewKey(params.row)} />
            </>
        );
    };

    const CertificateExpiryCell = (params) => {
        const isValid = params.value > Date.now();

        return (
            <>
                {params.value
                    ? <StatusIndicator status={isValid ? 'success' : 'error'} label={isValid ? 'Up to date' : 'Expired'} message={params.value.toISOString()} />
                    : '-'
                }
            </>
        );
    };

    return [
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
            renderCell: CertificatesCell,
        },
        {
            field: 'createdAt',
            headerName: 'Created at',
            minWidth: 100,
            flex: 1,
            valueFormatter: ({ value }) => value ? formatDate(value) : '-',
            renderCell: ({ value, formattedValue }) => <span title={value?.toISOString()}>{formattedValue}</span>,
        },
        {
            field: 'certificateExpiry',
            headerName: 'Certificate Validity',
            minWidth: 100,
            flex: 1,
            renderCell: CertificateExpiryCell,
        },
    ] as GridColDef<KafkaServiceAccountListDto>[];
};
