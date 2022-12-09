// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Paper, SxProps } from '@mui/material';

import { DataGridPro, GridColDef, GridRowModel, GridSelectionModel } from '@mui/x-data-grid-pro';
import { LicenseInfo } from '@mui/x-license-pro';

LicenseInfo.setLicenseKey('4a83cf3032e8518adfbe8694d092262dTz00ODUxMyxFPTE2OTEyMjE0ODgxODUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=');

type DataTableProProps = {
    rows: GridRowModel[];
    columns: GridColDef[];
    isRowSelectable?: boolean;
    isRowCheckable?: boolean;
    selectionModel?: GridSelectionModel;
    handleSelectionModelChange?: React.Dispatch<React.SetStateAction<GridSelectionModel>>;
    getRowId?: (row: GridRowModel) => string;
    sx?: SxProps

    processRowUpdate?: any;
    experimentalFeatures?: any;
    onProcessRowUpdateError?: any;
    apiRef?: any;
};

export const DataTablePro = (props: DataTableProProps) =>
    <Paper sx={{ width: 1, height: 1 }}>
        <DataGridPro
            rows={props.rows}
            columns={props.columns}
            checkboxSelection={props.isRowSelectable || false}
            selectionModel={props.selectionModel}
            onSelectionModelChange={props.handleSelectionModelChange}
            getRowId={props.getRowId}
            getRowHeight={() => 'auto'}
            autoHeight={true}
            headerHeight={46}
            disableColumnMenu
            disableSelectionOnClick
            hideFooter
            sx={props.sx}
            processRowUpdate={props.processRowUpdate}
            experimentalFeatures={props.experimentalFeatures}
            onProcessRowUpdateError={props.onProcessRowUpdateError}
            apiRef={props.apiRef}
        />
    </Paper>;
