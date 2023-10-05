// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { DataGridProProps } from '@mui/x-data-grid-pro';

import { dataTableDescription } from './helpers';
import { dummyColumns, dummyEditCellsColumns, dummyIconColumns, dummyIconRows, dummyRows } from '../../helpers/DummyContents';

import { DataGrid, dataGridDefaultProps } from './DataGrid';

const meta: Meta<typeof DataGrid> = {
    title: 'Data Grid',
    component: DataGrid,
    parameters: {
        docs: {
            description: { component: dataTableDescription },
        },
        controls: {
            include: ['rows', 'columns', 'checkboxSelection', 'onRowClick', 'loading', 'hideFooter', 'disableSelectionOnClick'],
        },
    },
    argTypes: {
        rows: {
            description: `Rows to display in the table. <br/> <br/>
            Rows need to be an array of objects. Each object should have a unique id property.`
        },
        columns: {
            description: `Columns to display in the table. <br/> <br/>
            Columns need to be an array of objects. Each object should have a field property.`
        },
        checkboxSelection: {
            description: `If true, a checkbox is rendered in the first column.`
        },
        onRowClick: {
            description: `Callback fired when a row is clicked. <br/> <br/>
            Signature: function(params: RowParams) => void)`
        },
        loading: {
            description: `If true, the loading overlay is displayed. <br/> <br/>
            Manage the loading state yourself by using the loading prop.`
        },
        hideFooter: {
            description: `If true, the footer component is hidden. <br/> <br/>
            The footer component displays the total number of rows and the selected number of rows.`
        },
        disableSelectionOnClick: {
            description: `If true, clicking on a cell will not select the row.`
        },
    },
};

export default meta;

type Story = StoryObj<DataGridProProps>;

export const Default: Story = {
    args: {
        ...dataGridDefaultProps,
        rows: dummyRows,
        columns: dummyColumns,
        checkboxSelection: false,
        loading: false,
        onRowClick: () => action('onRowClick'),
        onCellClick: () => action('onCellClick'),
    },
};

export const IconCells: Story = {
    args: {
        ...Default.args,
        rows: dummyIconRows,
        columns: dummyIconColumns,
    },
};
IconCells.parameters = {
    docs: {
        description: {
            story: `Icon buttons is found inside their own column in the table that cause a specific action to a specific row of data.<br/>
            Use Icon to display a specific icon in the table.`
        },
    },
};

export const EditableCells: Story = {
    args: {
        ...Default.args,
        rows: dummyRows,
        columns: dummyEditCellsColumns,
        experimentalFeatures: { newEditingApi: true },
    },
};
EditableCells.parameters = {
    docs: {
        description: {
            story: `If a particular data field can be changed by the user, make the cell editable.<br/>
            Only use this when the user does not need to see a more detailed view to edit the data.<br/>
            Cells should not be editable by default, only when required.`
        },
    },
};

// TODO: Add more stories.
// export const SelectCells = () => {};
// export const CustomToolbar = () => {};// Not related with Data Table! With FilterableColumns.
// export const FilterableColumns = () => {};
// export const EmptyDataGrid = () => {};
// export const ExpandableRows = () => {};
// export const DisabledRows = () => {};
// export const ScrollableDataGrid = () => {};
// export const RowEditMode = () => {};

// TODOS:
// Add into description what is needed in every Data Table.
// Add sorting guidance.
// Add alignment guidance.
// Handle selected rows/cells.

// TODO: To we need these...
// selectionModel = { selectedRowIds }
// onSelectionModelChange = { setSelectedRowIds }
// processRowUpdate: (params) => { console.log(params); },
// onProcessRowUpdateError: (params) => { console.log(params); },
// experimentalFeatures: { newEditingApi: true },
// rowModesModel = { rowMode }
// onRowModesModelChange = { setRowMode }
