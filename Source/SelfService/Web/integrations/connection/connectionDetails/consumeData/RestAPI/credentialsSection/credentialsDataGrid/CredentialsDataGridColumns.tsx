// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { GridColDef } from '@mui/x-data-grid-pro';

import { ServiceAccountListDto } from '../../../../../../../apis/integrations/generated';
import { formatDate } from '../../../../../../../utils/helpers/dates';

export const CredentialsDataGridColumns: GridColDef<ServiceAccountListDto>[] = [
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
        field: 'access',
        headerName: 'Access',
        minWidth: 100,
        flex: 1,
        valueFormatter: ({ value }) =>
            value === 'Read' ? 'Read' : value === 'ReadWrite' ? 'Read & Write' : value === 'Admin' ? 'Admin' : '-',
    },
    {
        field: 'createdAt',
        headerName: 'Created at',
        minWidth: 100,
        flex: 1,
        valueFormatter: ({ value }) => value ? formatDate(value) : '-',
        renderCell: ({ formattedValue, value }) => <span title={value?.toISOString()}>{formattedValue}</span>
    },
];
