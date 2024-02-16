// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useNavigate } from 'react-router-dom';

import { DataGridPro, GridInputSelectionModel } from '@mui/x-data-grid-pro';

import { dataGridDefaultProps, DataGridWrapper } from '@dolittle/design-system';

import { MessageMappingModel } from '../../../../../../../apis/integrations/generated';

import { messagesDataGridColumns } from './MessagesDataGridColumns';

export type MessagesDataGridProps = {
    rows: any[];
    initialSelectedIds: GridInputSelectionModel;
    onSelectedIdsChanged: (newSelectedIds: string[]) => void;
};

export const MessagesDataGrid = ({ rows, initialSelectedIds, onSelectedIdsChanged }: MessagesDataGridProps) => {
    const navigate = useNavigate();

    const columns = messagesDataGridColumns;

    const onTableRowClick = (row: MessageMappingModel): void => {
        navigate(`edit/${row.fromTable?.name}/${row.name}`);
    };

    return (
        <DataGridWrapper>
            <DataGridPro
                {...dataGridDefaultProps}
                rows={rows}
                columns={columns}
                onRowClick={({ row }) => onTableRowClick(row as MessageMappingModel)}
                checkboxSelection
                experimentalFeatures={{ newEditingApi: true }}
                selectionModel={initialSelectedIds}
                onSelectionModelChange={selectionModel => onSelectedIdsChanged(selectionModel as string[])}
            />
        </DataGridWrapper>
    );
};
