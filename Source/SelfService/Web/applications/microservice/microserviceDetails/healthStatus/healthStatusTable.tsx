// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useState } from 'react';

import { Paper, Typography } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { DataGridPro, GridRowId, GridRowParams } from '@mui/x-data-grid-pro';

import { PodLogScreen } from '../../podLogScreen';
import { columns } from './healthStatusTableColumns';

const styles = {
    podTitle: {
        letterSpacing: '0.17px',
        minHeight: 5.75,
        p: 1.25,
        borderBottom: '1px solid rgba(14, 13, 16, 1)',
    },
    dataTableWrapper: {
        'width': 1,
        'mb': 3,
        // Moves the Container-column header left, so that it covers the "detail expand icon" column as well.
        '& .move-container-header-left': { left: -50 },
    },
    dataTable: {
        '& .MuiDataGrid-row': { cursor: 'default' },
        '& .MuiDataGrid-cell:focus-within': { outline: 'none' },
    },
};

const DetailPanelExpandIcon = () => <ExpandMore fontSize='medium' />;
const DetailPanelCollapseIcon = () => <ExpandLess fontSize='medium' />;

const CustomToolbar = (rows: HealthStatusTableRow[]) =>
    <Typography variant='body2' sx={styles.podTitle}>{`Pod: ${rows[0]?.podName || 'N/A'}`}</Typography>;

const DetailPanelContent = ({ row }: { row: HealthStatusTableRow }) =>
    <Paper>
        <PodLogScreen applicationId={row.application} podName={row.podName} containerName={row.containerName} />
    </Paper>;

export type HealthStatusTableStats = {
    average: number;
    maximum: number;
    current: number;
};

export type HealthStatusTableRow = {
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

export type HealthStatusTableProps = {
    rows: HealthStatusTableRow[];
};

export const HealthStatusTable = ({ rows }: HealthStatusTableProps) => {
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
        <Paper sx={styles.dataTableWrapper}>
            <DataGridPro
                rows={rows}
                columns={columns}
                getRowHeight={() => 'auto'}
                autoHeight={true}
                headerHeight={46}
                disableColumnMenu
                hideFooter
                disableSelectionOnClick
                getDetailPanelContent={({ row }: GridRowParams<HealthStatusTableRow>) => <DetailPanelContent row={row} />}
                getDetailPanelHeight={getDetailPanelHeight}
                detailPanelExpandedRowIds={detailPanelExpandedRowIds}
                onDetailPanelExpandedRowIdsChange={handleDetailPanelExpandedRowIdsChange}
                sx={styles.dataTable}
                components={{
                    DetailPanelExpandIcon,
                    DetailPanelCollapseIcon,
                    Toolbar: () => CustomToolbar(rows)
                }}
            />
        </Paper>
    );
};
