// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { DataGridPro, DataGridProProps, GridColDef } from '@mui/x-data-grid-pro';
import { Paper } from '@mui/material';

import { Button, IconButton } from '@dolittle/design-system';

import { dataTableDescription, dummyDataTableColumns, dummyIconColumns, dummyDataTableRows, dummyDataTableRowsWithIcons } from './helpers';

import { DataTablePro } from './DataTablePro';

const meta: Meta<typeof DataTablePro> = {
    title: 'Data Grid',
    component: DataTablePro,
    argTypes: {

    },
    parameters: {
        docs: {
            description: { component: dataTableDescription },
        },
        controls: {
            include: [],
        },
    },
};

export default meta;

type Story = StoryObj<DataGridProProps>;

export const Primary: Story = {
    args: {
        rows: dummyDataTableRows,
        columns: dummyDataTableColumns,
        headerHeight: 46,
        getRowHeight: () => 'auto',
        autoHeight: true,
        checkboxSelection: true,
        hideFooter: true,
        disableColumnMenu: true,
    },
};

export const WithIcons: Story = {
    args: {
        ...Primary.args,
        rows: dummyDataTableRowsWithIcons,
        columns: dummyIconColumns,
        checkboxSelection: false,
        disableSelectionOnClick: true,
    },
};

// export const EditableCells = () => {};
// export const WithStatuses = () => {};:?
// export const CustomToolbar = () => {};
// export const EmptyDataTable = () => {};
// export const WithLoading = () => {};
// export const WithCheckboxSelection = () => {};
// export const SortableColumns = () => {};


// export const WithCustomToolbar = () =>
//     <DataGridPro
//         rows={rows}
//         columns={columns}
//         headerHeight={46}
//         getRowHeight={() => 'auto'}
//         disableSelectionOnClick
//         autoHeight
//         hideFooter
//         disableColumnMenu
//         disableColumnReorder
//         disableColumnResize
//         disableColumnSelector
//         components={{
//             Toolbar: () => <DataTableToolbar title='Toolbar title' buttons={toolbarButtons} />,
//         }}
//     />;

// export const EmptyDataTable = () => {
//     return (
//         <DataGridPro
//             rows={rows}
//             columns={columns}
//             headerHeight={46}
//             getRowHeight={() => 'auto'}
//             autoHeight
//             hideFooter
//             disableColumnMenu
//             checkboxSelection
//         // components={{
//         //     NoRowsOverlay: () => <EmptyDataTable />,
//         // }}
//         />
//     );
// };

// export const WithLoading = () => {
//     const [loadingRows, setLoadingRows] = useState(true);

//     return (
//         <DataGridPro
//             rows={rows}
//             columns={columns}
//             loading={loadingRows}
//             headerHeight={46}
//             getRowHeight={() => 'auto'}
//             autoHeight
//             hideFooter
//             disableColumnMenu
//             checkboxSelection
//         />
//     );
// };

// export const WithCheckboxSelection = () =>
//     <DataGridPro
//         rows={rows}
//         columns={columns}
//         headerHeight={46}
//         getRowHeight={() => 'auto'}
//         autoHeight
//         checkboxSelection
//         //onSelectionModelChange={onSelectedIdsChanged}
//         //selectionModel={selectedIds}
//         hideFooter
//         disableColumnMenu
//         disableColumnReorder
//         disableColumnResize
//         disableColumnSelector
//         disableSelectionOnClick
//     />;

//export const ExpandableRows = () => {};

// export const Pagination = () =>
//     <DataGridPro
//         rows={rows}
//         columns={columns}
//         headerHeight={46}
//         getRowHeight={() => 'auto'}
//         autoHeight
//         pagination
//         pageSize={10}
//         rowsPerPageOptions={[10]}
//         disableColumnMenu
//         disableColumnReorder
//         disableColumnResize
//         disableColumnSelector
//         disableSelectionOnClick
//     />;

//getRowClassName={row => selectedIds?.includes(row.id) ? '' : 'hide-row'}
