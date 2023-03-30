// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DataGridPro, DataGridProProps, GridColDef } from '@mui/x-data-grid-pro';
import { Paper } from '@mui/material';

import { Button } from '@dolittle/design-system';

import { dataTableDescription, columns, rows, toolbarButtons } from './helpers';
import { DataTableToolbar } from './DataTableToolbar';

export default {
    decorators: [
        (Story) => (
            <Paper sx={{ width: 1, height: 1, minHeight: 250 }}>
                {Story()}
            </Paper>
        )
    ],
    parameters: {
        docs: {
            description: { component: dataTableDescription },
        },
    },
};

// const Template: ComponentStory<typeof DataGridPro> = () => {
//     const [selectedRowIds, setSelectedRowIds] = useState<any[]>([]);
//     const [rows, setRows] = useState(initialRows);

//     return (
//         <Box>
//             <Button
//                 label='Reset'
//                 startWithIcon={<RefreshRounded />}
//                 disabled={rows.length === 3}
//                 onClick={() => setRows(initialRows)}
//             />

//             <Button
//                 label='Delete selected'
//                 startWithIcon={<DeleteRounded />}
//                 disabled={selectedRowIds.length === 0}
//                 onClick={() => setRows(rows.filter(row => !selectedRowIds.includes(row.id)))}
//             />

//         </Box>
//     );
// };

// const Template = (args: DataGridProProps) =>
//     <DataGridPro
//         rows={rows}
//         columns={columns}
//         //loading={loadingRows}
//         headerHeight={46}
//         getRowHeight={() => 'auto'}
//         autoHeight
//         hideFooter
//         disableColumnMenu
//         checkboxSelection
//     />;

export const Default = () =>
    <DataGridPro
        rows={rows}
        columns={columns}
        headerHeight={46}
        getRowHeight={() => 'auto'}
        autoHeight
        hideFooter
        disableColumnMenu
    />;

export const WithCustomToolbar = () =>
    <DataGridPro
        rows={rows}
        columns={columns}
        headerHeight={46}
        getRowHeight={() => 'auto'}
        autoHeight
        hideFooter
        disableColumnMenu
        components={{
            Toolbar: () => <DataTableToolbar title='Toolbar title' buttons={toolbarButtons} />,
        }}
    />;

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

// export const WithActionIcons = () => {};

//export const EditableCells = () => {};

//export const WithCheckboxSelection = () => {}; //checkboxSelection

//export const ExpandableRows = () => {};

//export const Pagination = () => {};
