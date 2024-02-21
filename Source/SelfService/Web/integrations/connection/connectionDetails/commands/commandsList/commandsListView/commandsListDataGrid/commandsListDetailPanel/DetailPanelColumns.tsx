// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid-pro';

import { Button } from '@dolittle/design-system';

const ParameterSelectCell = (params: GridRenderCellParams) => (
    <Button label={params.value} color='subtle' endWithIcon='ArrowDropDownRounded' sx={{ width: 1, height: 1, textTransform: 'none', typography: 'body2' }} />
);

const parameterModeOptions = [
    {
        value: 'Optional',
        label: 'Optional',
    },
    {
        value: 'Required',
        label: 'Required',
    },
    {
        value: 'Hardcoded value',
        label: 'Hardcoded value',
    },
];

export const commandsListDetailPanelColumns: GridColDef[] = [
    {
        field: 'm3Argument',
        headerName: 'M3 Argument',
        flex: 1,
    },
    {
        field: 'description',
        headerName: 'Description',
        flex: 1,
    },
    {
        field: 'parameterName',
        headerName: 'Parameter Name',
        flex: 1,
    },
    {
        field: 'mode',
        headerName: 'Mode',
        headerAlign: 'center',
        type: 'singleSelect',
        editable: true,
        valueOptions: parameterModeOptions,
        renderCell: ParameterSelectCell,
        minWidth: 120,
        flex: 1,
    },
    {
        field: 'defaultValue',
        headerName: 'Default Value',
        flex: 1,
    },
];
