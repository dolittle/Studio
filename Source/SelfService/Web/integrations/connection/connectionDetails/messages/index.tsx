// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Outlet } from 'react-router-dom';

import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';
import { Box, Divider, Paper, Typography } from '@mui/material';

import { Button, Icon } from '@dolittle/design-system';

const messagesColumn: GridColDef[] = [
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

const CustomToolbar = () => {
    return (
        <Box sx={{ borderBottom: '1px solid', borderColor: 'outlineborder' }}>
            <Box sx={{ minHeight: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1.25, }}>
                <Typography variant='subtitle2'>Your Messages</Typography>
                <Box sx={{ display: 'flex', gap: 4 }}>
                    <Button label='Delete messages' startWithIcon={<Icon icon='DeleteRounded' />} disabled />
                    <Button label='Copy Messages to...' startWithIcon={<Icon icon='CopyAllRounded' />} disabled />
                    <Button label='Deploy message(s)...' startWithIcon={<Icon icon='RocketLaunch' />} disabled />
                </Box>
            </Box>
        </Box>
    );
};

export const MessagesView = () => {
    return (
        <>
            <Paper sx={{ width: 1, mt: 2 }}>
                <DataGridPro
                    rows={[{ id: 1, name: 'test' }]}
                    columns={messagesColumn}
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
                        Toolbar: () => <CustomToolbar />,
                    }}
                />
            </Paper>
        </>
    );
};
