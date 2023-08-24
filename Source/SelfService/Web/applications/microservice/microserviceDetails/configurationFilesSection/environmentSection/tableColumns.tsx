// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { GridColDef } from '@mui/x-data-grid-pro';

import { Button, EditCell, EditTextFieldCell } from '@dolittle/design-system';

import { EnvironmentVariableTableRow } from './environmentVariableSection';

export const envVariableColumns: GridColDef<EnvironmentVariableTableRow>[] = [
    {
        field: 'name',
        headerName: 'Name',
        width: 330,
        editable: true,
        renderCell: EditCell,
        renderEditCell: EditTextFieldCell,
    },
    {
        field: 'value',
        headerName: 'Value',
        width: 330,
        editable: true,
        renderCell: EditCell,
        renderEditCell: EditTextFieldCell,
    },
    {
        field: 'isSecret',
        headerName: 'Secret',
        type: 'singleSelect',
        valueOptions: [{ value: true, label: 'Yes' }, { value: false, label: 'No' }],
        editable: true,
        renderCell: ({ value }) => (
            <Button label={value ? 'Yes' : 'No'} color='subtle' endWithIcon='ArrowDropDownRounded' sx={{ width: 1, height: 1 }} />
        ),
        // TODO: Implement this.
        //renderEditCell: ({ id, value, api }) => ();
        width: 120,
    },
];
