// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { GridColDef, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid-pro';

import { Button, DataGridEditCellView, DataGridSelectCellView } from '@dolittle/design-system';

import { MappedParameter } from '../../../../../../apis/integrations/generated';

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

export const commandsListDetailPanelColumns: GridColDef<MappedParameter>[] = [
    {
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
    },
    {
        field: 'mappedName',
        headerName: 'M3 Argument',
        minWidth: 160,
        flex: 1,
    },
    {
        field: 'mappedDescription',
        headerName: 'Description',
        editable: true,
        renderCell: DataGridEditCellView,
        minWidth: 250,
        flex: 1,
    },
    {
        field: 'description',
        headerName: 'Parameter Name',
        editable: true,
        valueGetter: (params) => (params.row.parameter?.description || ''),
        renderCell: DataGridEditCellView,
        minWidth: 250,
        flex: 1,
    },
    {
        field: 'defaultValue',
        headerName: 'Default Value',
        editable: true,
        renderCell: DataGridEditCellView,
        minWidth: 200,
        flex: 1,
    },
    {
        field: 'mode',
        headerName: 'Mode',
        headerAlign: 'center',
        editable: true,
        type: 'singleSelect',
        valueOptions: parameterModeOptions,
        // This is for demo purposes only, in a real application you would use the commented line below.
        //renderCell: DataGridSelectCellView,
        renderCell: ({ value }) => (
            <Button label={'Optional'} color='subtle' disabled endWithIcon='ArrowDropDownRounded' sx={{ width: 1, height: 1 }} />
        ),
        minWidth: 200,
        flex: 1,
    },
];
