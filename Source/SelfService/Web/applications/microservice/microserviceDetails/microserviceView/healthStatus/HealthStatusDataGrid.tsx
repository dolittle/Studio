// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useEffect, useState } from 'react';

import { DataGridPro, GridRowId, GridRowParams } from '@mui/x-data-grid-pro';

import {
    DataGridCustomToolbar,
    dataGridDefaultProps,
    DataGridDetailPanel,
    DataGridWrapper,
    DetailPanelExpandIcon,
    DetailPanelCollapseIcon,
    LoadingSpinner
} from '@dolittle/design-system';

import { getPodLogs, HttpResponsePodLog } from '../../../../../apis/solutions/api';

import { healthStatusDataGridColumns } from './healthStatusTableColumns';

const styles = {
    '& .MuiDataGrid-row': { cursor: 'default' },
};

type DetailPanelContentProps = {
    row: HealthStatusDataGridRow;
};

const DetailPanelContent = ({ row }: DetailPanelContentProps) => {
    const [data, setData] = useState({ logs: '' } as HttpResponsePodLog);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getPodLogs(row.application, row.podName, row.containerName)
            .then(setData)
            .finally(() => setLoading(false));
    }, []);

    if (isLoading) return <LoadingSpinner />;

    return (
        <DataGridDetailPanel content={!data.logs ? 'There are no logs printed for this microservice.' : data.logs} />
    );
};

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

    const getDetailPanelHeight = useCallback(() => 'auto', []);

    return (
        <DataGridWrapper>
            <DataGridPro
                {...dataGridDefaultProps}
                rows={rows}
                columns={healthStatusDataGridColumns}
                getDetailPanelContent={({ row }: GridRowParams<HealthStatusDataGridRow>) => <DetailPanelContent row={row} />}
                getDetailPanelHeight={getDetailPanelHeight}
                detailPanelExpandedRowIds={detailPanelExpandedRowIds}
                onDetailPanelExpandedRowIdsChange={handleDetailPanelExpandedRowIdsChange}
                sx={styles}
                components={{
                    DetailPanelExpandIcon,
                    DetailPanelCollapseIcon,
                    Toolbar: () => <DataGridCustomToolbar title={(`Pod: ${rows[0]?.podName || 'N/A'}`)} />,
                }}
            />
        </DataGridWrapper>
    );
};
