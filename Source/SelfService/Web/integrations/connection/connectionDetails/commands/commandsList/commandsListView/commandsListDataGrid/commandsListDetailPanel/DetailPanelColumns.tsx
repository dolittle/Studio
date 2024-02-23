// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { GridColDef } from '@mui/x-data-grid-pro';

import { DataGridEditCellEdit, DataGridEditCellView, DataGridSelectCellView } from '@dolittle/design-system';

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
        minWidth: 160,
        flex: 1,
    },
    {
        field: 'description',
        headerName: 'Description',
        editable: true,
        renderCell: DataGridEditCellView,
        renderEditCell: DataGridEditCellEdit,
        minWidth: 230,
        flex: 1,
    },
    {
        field: 'parameterName',
        headerName: 'Parameter Name',
        editable: true,
        renderCell: DataGridEditCellView,
        renderEditCell: DataGridEditCellEdit,
        minWidth: 230,
        flex: 1,
    },
    {
        field: 'defaultValue',
        headerName: 'Default Value',
        editable: true,
        renderCell: DataGridEditCellView,
        renderEditCell: DataGridEditCellEdit,
        minWidth: 230,
        flex: 1,
    },
    {
        field: 'mode',
        headerName: 'Mode',
        headerAlign: 'center',
        editable: true,
        type: 'singleSelect',
        valueOptions: parameterModeOptions,
        renderCell: DataGridSelectCellView,
        minWidth: 200,
        flex: 1,
    },
];
