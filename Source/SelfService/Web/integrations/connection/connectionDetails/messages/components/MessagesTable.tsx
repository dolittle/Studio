// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Paper } from '@mui/material';
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';

import { DataTableToolbar, Icon } from '@dolittle/design-system';

const messagesDataColumns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Message Type',
        // minWidth: 270,
        flex: 1,
    },
    {
        field: 'fromTable.description',
        headerName: 'Description',
        // minWidth: 270,
        flex: 1,
    },
    {
        field: 'fromTable.name',
        headerName: 'Table Name',
        // minWidth: 270,
        flex: 1,
    },
    {
        field: 'fieldMappings',
        headerName: 'No. of Mapped Fields',
        // minWidth: 270,
        flex: 1,
    },
    {
        field: 'deployedAt',
        headerName: 'Last Deployed',
        //minWidth: 270,
        flex: 1,
    },
];

const messagesToolbarButtons = [
    {
        label: 'Delete messages',
        startWithIcon: <Icon icon='DeleteRounded' />,
        disabled: true,
    } as const,
    {
        label: 'Copy Messages to...',
        startWithIcon: <Icon icon='CopyAllRounded' />,
        disabled: true,
    } as const,
    {
        label: 'Deploy message(s)...',
        startWithIcon: <Icon icon='RocketLaunch' />,
        disabled: true,
    } as const,
];

type MessagesTableProps = {
    rows: any[];
    loading?: boolean;
};

export const MessagesTable = ({ rows }: MessagesTableProps) =>
    <Paper sx={{ width: 1, mt: 2, boxShadow: 'none' }}>
        <DataGridPro
            rows={rows}
            columns={messagesDataColumns}
            //loading={loading}
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
    </Paper>;
