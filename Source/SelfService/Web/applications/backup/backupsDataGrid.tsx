// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { DataGridPro } from '@mui/x-data-grid-pro';

import { DataGridWrapper } from '@dolittle/design-system';

import { getBackupsDataGridColumns } from './BackupsDataGridColumns';

export type BackupsDetailsList = {
    createdOn: string;
    environment: string;
    file: string;
};

export type BackupsDataGridProps = {
    applicationId: string;
    backupsDataGridRows: BackupsDetailsList[];
};

export const BackupsDataGrid = ({ applicationId, backupsDataGridRows }: BackupsDataGridProps) =>
    <DataGridWrapper>
        <DataGridPro
            rows={backupsDataGridRows}
            columns={getBackupsDataGridColumns(applicationId)}
            autoHeight
            headerHeight={46}
            getRowHeight={() => 'auto'}
            getEstimatedRowHeight={() => 40}
            disableColumnMenu
            disableColumnReorder
            disableColumnResize
            disableColumnSelector
            disableSelectionOnClick
            hideFooter
        />
    </DataGridWrapper>;
