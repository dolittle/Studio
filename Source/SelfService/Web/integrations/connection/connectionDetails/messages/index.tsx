// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Outlet } from 'react-router-dom';

import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';
import { Paper } from '@mui/material';

import { DataTableToolbar, Icon } from '@dolittle/design-system';

const messagesDataColumn: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Message Type',
        // minWidth: 270,
        // flex: 1,
    },
    {
        field: 'name',
        headerName: 'Description',
        // minWidth: 270,
        // flex: 1,
    },
    {
        field: 'name',
        headerName: 'Table Name',
        // minWidth: 270,
        // flex: 1,
    },
    {
        field: 'name',
        headerName: 'No. of Mapped Fields',
        // minWidth: 270,
        //flex: 1,
    },
    {
        field: 'name',
        headerName: 'Last Deployed',
        // minWidth: 270,
        // flex: 1,
    },
];

export const messagesToolbarButtons = [
    {
        label: 'Delete messages',
        startWithIcon: <Icon icon='DeleteRounded' />,
        disabled: true,
    },
    {
        label: 'Copy Messages to...',
        startWithIcon: <Icon icon='CopyAllRounded' />,
        disabled: true,
    },
    {
        label: 'Deploy message(s)...',
        startWithIcon: <Icon icon='RocketLaunch' />,
        disabled: true,
    },
];

export const MessagesView = () => {
    return (
        <>
            <Paper sx={{ width: 1, mt: 2 }}>
                <DataGridPro
                    rows={[{ id: 1, name: 'test' }]}
                    columns={messagesDataColumn}
                    //loading={loadingRows}
                    headerHeight={46}
                    getRowHeight={() => 'auto'}
                    //onRowClick={({ row }) => onTableRowClick(row.id)}
                    autoHeight
                    hideFooter
                    disableColumnMenu
                    checkboxSelection
                    disableSelectionOnClick
                    components={{
                        Toolbar: () => <DataTableToolbar title='Your Messages' buttons={messagesToolbarButtons} />,
                    }}
                />
            </Paper>
        </>
    );
};
