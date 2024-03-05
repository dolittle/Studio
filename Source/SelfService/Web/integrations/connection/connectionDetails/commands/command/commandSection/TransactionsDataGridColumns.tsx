// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { GridColDef } from '@mui/x-data-grid-pro';

export type ProgramTransaction = {
    name: string;
    description: string;
};

export const programTransactionColumns: GridColDef<ProgramTransaction>[] = [
    {
        field: 'name',
        headerName: 'Transaction name',
        minWidth: 400,
    },
    {
        field: 'description',
        headerName: 'Description',
        minWidth: 400,
    },
];
