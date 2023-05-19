// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { GridColDef } from '@mui/x-data-grid-pro';

import { EditCell, EditTextFieldCell, IconButton, StatusIndicator } from '@dolittle/design-system';

type DummyRowsProps = {
    id: string;
    col1?: string;
    col2?: string;
    col3?: string;
    col4?: string;
};

export const dummyRows: DummyRowsProps[] = [
    { id: '1', col1: 'Row 1', col2: 'Row 1', col3: 'Row 1', col4: 'Row 1' },
    { id: '2', col1: 'Row 2', col2: 'Row 2', col3: 'Row 2', col4: 'Row 2' },
    { id: '3', col1: 'Row 3', col2: 'Row 3', col3: 'Row 3', col4: 'Row 3' },
    { id: '4', col1: 'Row 4', col2: 'Row 4', col3: 'Row 4', col4: 'Row 4' },
];

export const dummyColumns: GridColDef[] = [
    {
        field: 'col1',
        headerName: 'Column 1',
        sortable: false,
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'col2',
        headerName: 'Column 2',
        sortable: false,
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'col3',
        headerName: 'Column 3',
        sortable: false,
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'col4',
        headerName: 'Column 4',
        sortable: false,
        minWidth: 150,
        flex: 1,
    },
];

export const dummyIconRows: DummyRowsProps[] = [{ id: '1' }];

export const dummyIconColumns: GridColDef[] = [
    {
        field: 'success',
        headerName: 'Status success',
        sortable: false,
        minWidth: 150,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: () => <StatusIndicator status='table-success' />,
    },
    {
        field: 'warning',
        headerName: 'Status warning',
        sortable: false,
        minWidth: 150,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: () => <StatusIndicator status='warning' />,
    },
    {
        field: 'error',
        headerName: 'Status error',
        sortable: false,
        minWidth: 150,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: () => <StatusIndicator status='error' />,
    },
    {
        field: 'unknown',
        headerName: 'Status unknown',
        sortable: false,
        minWidth: 150,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: () => <StatusIndicator status='unknown' />,
    },
    {
        field: 'download',
        headerName: 'Download file',
        sortable: false,
        minWidth: 150,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: () => (
            <IconButton
                tooltipText='Download'
                icon='DownloadRounded'
                href={URL.createObjectURL(new Blob([], { type: 'text/plain' }))}
                download='sample.log'
            />
        ),
    },
];

export const dummyEditCellsColumns: GridColDef[] = [
    {
        field: 'col1',
        headerName: 'Column 1',
        sortable: false,
        minWidth: 150,
        flex: 1,
        editable: true,
        renderCell: EditCell,
        renderEditCell: EditTextFieldCell,
    },
    {
        field: 'col2',
        headerName: 'Column 2',
        sortable: false,
        minWidth: 150,
        flex: 1,
        editable: true,
        renderCell: EditCell,
        renderEditCell: EditTextFieldCell,
    },
    {
        field: 'col3',
        headerName: 'Column 3',
        sortable: false,
        minWidth: 150,
        flex: 1,
        editable: true,
        renderCell: EditCell,
        renderEditCell: EditTextFieldCell,
    },
    {
        field: 'col4',
        headerName: 'Column 4',
        sortable: false,
        minWidth: 150,
        flex: 1,
        editable: true,
        renderCell: EditCell,
        renderEditCell: EditTextFieldCell,
    },
];
