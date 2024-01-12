// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { GridColDef } from '@mui/x-data-grid-pro';

import { MessageMappingModel } from '../../../../../../../apis/integrations/generated';

import { formatDate } from '../../../../../../../utils/helpers/dates';
import { defaultEmptyDate } from '../../helpers';

export const messagesDataGridColumns: GridColDef<MessageMappingModel>[] = [
    {
        field: 'name',
        headerName: 'Message Type',
        flex: 1,
    },
    {
        field: 'description',
        headerName: 'Description',
        flex: 1,
        valueGetter: params => params.row?.description || '-',
    },
    {
        field: 'fromTable.name',
        headerName: 'Table Name',
        flex: 1,
        valueGetter: params => params.row?.fromTable?.name,
    },
    {
        field: 'fieldMappings',
        headerName: 'No. of Mapped Fields',
        flex: 1,
        valueGetter: params => params.row?.fieldMappings?.length,
    },
    {
        field: 'deployedAt',
        headerName: 'Last Deployed',
        flex: 1,
        valueGetter: params => params.row.deployedAt && params.row.deployedAt.toISOString() !== defaultEmptyDate.toISOString()
            ? formatDate(params.row.deployedAt)
            : '-',
    },
];
