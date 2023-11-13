// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useState } from 'react';

import { DataGridPro, GridRowId, DataGridProProps } from '@mui/x-data-grid-pro';

import { DataGridCustomToolbar, dataGridDefaultProps, DataGridWrapper, DetailPanelExpandIcon, DetailPanelCollapseIcon } from '@dolittle/design-system';

import { healthStatusDataGridColumns } from './HealthStatusDataGridColumns';
import { DetailPanelContent } from './DetailPanelContent';

export type HealthStatusTableStats = {
    average: number;
    maximum: number;
    current: number;
};

export type HealthStatusDataGridRow = {
    id: string;
    podName: string;
    containerName: string;
    application: string;
    state: string;
    age: string;
    image: string;
    started: string;
    restarts: number;
    cpu?: HealthStatusTableStats;
    memory?: HealthStatusTableStats;
};

export type HealthStatusDataGridProps = {
    rows: HealthStatusDataGridRow[];
};

export const HealthStatusDataGrid = ({ rows }: HealthStatusDataGridProps) => {
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
        <DetailPanelContent row={row} />, []);

    const getDetailPanelHeight = useCallback(() => 'auto', []);

    return (
        <DataGridWrapper>
            <DataGridPro
                {...dataGridDefaultProps}
                rows={rows}
                columns={healthStatusDataGridColumns}
                getDetailPanelContent={getDetailPanelContent}
                getDetailPanelHeight={getDetailPanelHeight}
                detailPanelExpandedRowIds={detailPanelExpandedRowIds}
                onDetailPanelExpandedRowIdsChange={handleDetailPanelExpandedRowIdsChange}
                components={{
                    DetailPanelExpandIcon,
                    DetailPanelCollapseIcon,
                    Toolbar: () => <DataGridCustomToolbar title={(`Pod: ${rows[0]?.podName || 'N/A'}`)} />,
                }}
            />
        </DataGridWrapper>
    );
};
