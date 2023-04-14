// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Paper } from '@mui/material';
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';
import { useNavigate } from 'react-router-dom';

import { DataTableToolbar } from '@dolittle/design-system';
import { MessageMappingModel } from '../../../../../apis/integrations/generated';

import { formatStartingDate, formatDate } from '../../../../../utils/helpers/dates';

const messagesDataColumns: GridColDef<MessageMappingModel>[] = [
    {
        field: 'name',
        headerName: 'Message Type',
        // minWidth: 270,
        flex: 1,
    },
    {
        field: 'description',
        headerName: 'Description',
        // minWidth: 270,
        flex: 1,
    },
    {
        field: 'fromTable.name',
        headerName: 'Table Name',
        // minWidth: 270,
        flex: 1,
        valueGetter: (params) => params.row.fromTable?.name,
    },
    {
        field: 'fieldMappings',
        headerName: 'No. of Mapped Fields',
        // minWidth: 270,
        flex: 1,
        valueGetter: (params) => params.row.fieldMappings?.length,
    },
    {
        field: 'deployedAt',
        headerName: 'Last Deployed',
        //minWidth: 270,
        flex: 1,
        valueGetter: (params) => params.row.deployedAt ? formatDate(params.row.deployedAt) : '',
    },
];

const messagesToolbarButtons = [
    {
        label: 'Delete messages',
        startWithIcon: 'DeleteRounded',
        disabled: true,
    } as const,
    {
        label: 'Copy Messages to...',
        startWithIcon: 'CopyAllRounded',
        disabled: true,
    } as const,
    {
        label: 'Deploy message(s)...',
        startWithIcon: 'RocketLaunch',
        disabled: true,
    } as const,
];

export type MessagesTableProps = {
    rows: any[];
    loading?: boolean;
};

export const MessagesTable = ({ rows }: MessagesTableProps) => {
    const navigate = useNavigate();

    const onTableRowClick = (row: MessageMappingModel): void => {
        navigate(`edit/${row.fromTable?.name!}/${row.name}`);
    };

    return (
        <Paper sx={{ width: 1, mt: 2, boxShadow: 'none' }}>
            <DataGridPro
                rows={rows}
                columns={messagesDataColumns}
                //loading={loading}
                headerHeight={46}
                getRowHeight={() => 'auto'}
                onRowClick={({ row }) => onTableRowClick(row as MessageMappingModel)}
                autoHeight
                hideFooter
                disableColumnMenu
                checkboxSelection
                disableSelectionOnClick
                components={{
                    Toolbar: () => <DataTableToolbar title='Your Messages' buttons={messagesToolbarButtons} />,
                }} />
        </Paper>
    );
};
