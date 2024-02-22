// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { GridColDef } from '@mui/x-data-grid-pro';

import { DataGridEditCellEdit, DataGridEditCellView, DataGridSelectCellView, IconButton, StatusIndicator } from '../../index';

export const dataTableDescription = `Data tables are an excellent way to organize vast amounts of data. Data tables should be easy to scan, 
            allowing the user to look for patterns and develop insights.

**Interactive Elements:** interactive elements allow the user to manipulate the data, including selecting, adding, editing and removing data.

* Checkboxes: When data in a table can support many interactions such as removing, editing, restarting, syncing, etc… checkboxes are helpful in
allowing the user to select the data and manipulate it with a button or toolbar outside of the data table, instead of using an action icon in the data table itself.
This frees up space for more columns and, therefore, data. Always include a checkbox in the header row to allow for quick selection of all items within a data table.
 
* Clickable rows: If a user can see a more detailed view or page of the individual data sets, make the rows clickable, leading the user to a new view with more information.
If rows are clickable, then they should display a hover state change. Always provide a way for the user to return to the data table with either a back button or via a breadcrumb.

* Sorting columns: Sorting is a helpful function for manipulating data to better understand it. Include header sorters by default and remove when not necessary,
such as in columns that contain action icons. Sorting icons should always be displayed to the right of the column label.

* Expandable rows: Data rows can be expandable by utilizing the arrow icon button component. Expanded rows should show additional data as it pertains to the row above.
Only allow for one row to expand at a time so as not to overwhelm the user.`;

type DummyRowsProps = {
    id: string;
    col1?: string;
    col2?: string;
    col3?: string;
    col4?: string;
};

export const dummyColumns: GridColDef<DummyRowsProps>[] = [
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

export const dummyRows: DummyRowsProps[] = [
    { id: '1', col1: 'Row 1', col2: 'Row 1', col3: 'Row 1', col4: 'Row 1' },
    { id: '2', col1: 'Row 2', col2: 'Row 2', col3: 'Row 2', col4: 'Row 2' },
    { id: '3', col1: 'Row 3', col2: 'Row 3', col3: 'Row 3', col4: 'Row 3' },
    { id: '4', col1: 'Row 4', col2: 'Row 4', col3: 'Row 4', col4: 'Row 4' },
];

export const dummyIconColumns: GridColDef<DummyRowsProps>[] = [
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

export const dummyIconRows: DummyRowsProps[] = [{ id: '1' }];

export const dummyEditCellRows: DummyRowsProps[] = [
    { id: '1', col1: 'Editable Cell', col2: 'Editable Cell', col3: 'Select Cell', col4: 'Select Cell' },
    { id: '2', col1: 'Editable Cell', col2: 'Editable Cell', col3: 'Select Cell', col4: 'Select Cell' },
    { id: '3', col1: 'Editable Cell', col2: 'Editable Cell', col3: 'Select Cell', col4: 'Select Cell' },
    { id: '4', col1: 'Editable Cell', col2: 'Editable Cell', col3: 'Select Cell', col4: 'Select Cell' },
];

const selectValueOptions = [{ value: 'Option 1', label: 'Option 1' }, { value: 'Option 2', label: 'Option 2' }];

export const dummyEditCellColumns: GridColDef<DummyRowsProps>[] = [
    {
        field: 'col1',
        headerName: 'Column 1',
        sortable: false,
        headerAlign: 'center',
        minWidth: 150,
        flex: 1,
        editable: true,
        renderCell: DataGridEditCellView,
        renderEditCell: DataGridEditCellEdit,
    },
    {
        field: 'col2',
        headerName: 'Column 2',
        sortable: false,
        headerAlign: 'center',
        minWidth: 150,
        flex: 1,
        editable: true,
        renderCell: DataGridEditCellView,
        renderEditCell: DataGridEditCellEdit,
    },
    {
        field: 'col3',
        headerName: 'Column 3',
        sortable: false,
        headerAlign: 'center',
        minWidth: 150,
        flex: 1,
        editable: true,
        type: 'singleSelect',
        valueOptions: selectValueOptions,
        renderCell: DataGridSelectCellView,
    },
    {
        field: 'col4',
        headerName: 'Column 4',
        sortable: false,
        headerAlign: 'center',
        minWidth: 150,
        flex: 1,
        editable: true,
        type: 'singleSelect',
        valueOptions: selectValueOptions,
        renderCell: DataGridSelectCellView,
    },
];
