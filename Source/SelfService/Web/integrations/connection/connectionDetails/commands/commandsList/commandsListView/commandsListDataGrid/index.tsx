// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useState } from 'react';

import { DataGridPro, DataGridProProps, GridRowId } from '@mui/x-data-grid-pro';

import { dataGridDefaultProps, DataGridWrapper, DetailPanelExpandIcon, DetailPanelCollapseIcon } from '@dolittle/design-system';

import { CommandHeader } from '../../../../../../../apis/integrations/generated';

import { commandListDataGridColumns } from './CommandListDataGridColumns';
import { CommandsListDetailPanel } from './commandsListDetailPanel';

export type CommandsListDataGridProps = {
    commandListRows: CommandHeader[];
};

export const CommandsListDataGrid = ({ commandListRows }: CommandsListDataGridProps) => {
    const [detailPanelExpandedRowIds, setDetailPanelExpandedRowIds] = useState<GridRowId[]>([]);

    const handleDetailPanelExpandedRowIdsChange = (newIds: GridRowId[]) => {
        if (detailPanelExpandedRowIds) {
            // Remove previously expanded row id so only one panel can be expanded at the same time.
            newIds = newIds.slice(-1);
            setDetailPanelExpandedRowIds(newIds);
        } else {
            setDetailPanelExpandedRowIds(newIds);
        }
    };

    const getDetailPanelContent = useCallback<NonNullable<DataGridProProps['getDetailPanelContent']>>(({ row }) =>
        <CommandsListDetailPanel row={row} />, []);

    const getDetailPanelHeight = useCallback(() => 'auto', []);

    return (
        <DataGridWrapper>
            <DataGridPro
                {...dataGridDefaultProps}
                rows={commandListRows}
                columns={commandListDataGridColumns}
                getRowId={row => row.name}
                getDetailPanelContent={getDetailPanelContent}
                getDetailPanelHeight={getDetailPanelHeight}
                detailPanelExpandedRowIds={detailPanelExpandedRowIds}
                onDetailPanelExpandedRowIdsChange={handleDetailPanelExpandedRowIdsChange}
                components={{
                    DetailPanelExpandIcon,
                    DetailPanelCollapseIcon,
                }}
            />
        </DataGridWrapper>
    );
};
