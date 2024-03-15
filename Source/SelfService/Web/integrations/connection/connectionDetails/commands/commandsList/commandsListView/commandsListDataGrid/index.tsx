// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useNavigate } from 'react-router-dom';

import { DataGridPro } from '@mui/x-data-grid-pro';

import { dataGridDefaultProps, DataGridWrapper, DetailPanelExpandIcon, DetailPanelCollapseIcon } from '@dolittle/design-system';

import { CommandHeader } from '../../../../../../../apis/integrations/generated';

import { commandListDataGridColumns } from './CommandListDataGridColumns';

export type CommandsListDataGridProps = {
    commandListRows: CommandHeader[];
};

export const CommandsListDataGrid = ({ commandListRows }: CommandsListDataGridProps) => {
    const navigate = useNavigate();

    const onTableRowClick = (row: CommandHeader): void => {
        navigate(`edit/${row.commandId}/${row.name}`);
    };

    return (
        <DataGridWrapper>
            <DataGridPro
                {...dataGridDefaultProps}
                rows={commandListRows}
                columns={commandListDataGridColumns}
                getRowId={row => row.commandId}
                onRowClick={({ row }) => onTableRowClick(row)}
                components={{
                    DetailPanelExpandIcon,
                    DetailPanelCollapseIcon,
                }}
            />
        </DataGridWrapper>
    );
};
