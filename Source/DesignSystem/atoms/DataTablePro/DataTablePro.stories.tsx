// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { DataGridProProps } from '@mui/x-data-grid-pro';

import { dataTableDescription, dummyColumns, dummyIconColumns, dummyIconRows, dummyRows } from './helpers';

import { DataTablePro } from './DataTablePro';

// TODO: Add into description what is needed in every Data Table.
// TODO: Add sorting guidance.
// TODO: Add alignment guidance.

const meta: Meta<typeof DataTablePro> = {
    title: 'Data Table Pro',
    component: DataTablePro,
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
        rows: dummyRows,
        columns: dummyColumns,
        autoHeight: true,
        headerHeight: 46,
        getRowHeight: () => 'auto',
        onRowClick: () => action('onRowClick'),
        checkboxSelection: false,
        loading: false,
        hideFooter: true,
        disableSelectionOnClick: true,
        disableColumnMenu: true,
        disableColumnReorder: true,
        disableColumnResize: true,
        disableColumnSelector: true,
        // onCellClick: () => action('onCellClick'),
        // processRowUpdate: (params) => {console.log(params);},
        // onProcessRowUpdateError: (params) => {console.log(params);},
        // experimentalFeatures: {newEditingApi: true,},
    },
};

export const IconCells: Story = {
    args: {
        ...Default.args,
        rows: dummyIconRows,
        columns: dummyIconColumns,
        checkboxSelection: false,
        disableSelectionOnClick: true,
    },
};

// export const EditableCells = () => {};
// export const CustomToolbar = () => {};// Not related with Data Table! With FilterableColumns.
// export const FilterableColumns = () => {};
// export const EmptyDataTable = () => {};
// export const ExpandableRows = () => {};
// export const DisabledRows = () => {};
// export const ScrollableTable = () => {};
