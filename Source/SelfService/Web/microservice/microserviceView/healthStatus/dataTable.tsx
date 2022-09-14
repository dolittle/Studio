// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useState } from 'react';

import { ContainerStatusInfo } from 'Source/SelfService/Web/api/api';

import { Box, Paper, Typography } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { DataGridPro, GridRowId } from '@mui/x-data-grid-pro';

import { PodLogScreen } from '../../podLogScreen';
import { columns } from './dataTableColumns';

const styles = {
    podTitle: {
        fontWeight: 500,
        lineHeight: '1.5rem',
        letterSpacing: '0.17px',
        minHeight: 5.75,
        p: 1.25,
        borderBottom: '1px solid rgba(14, 13, 16, 1)'
    },
    dataTableWrapper: {
        'mb': 3,
        '& .negativeRowSpanHack': {
            mr: 6.25,
        },
        '& .MuiDataGrid-columnHeader[data-field="__detail_panel_toggle__"]': {
            display: 'none'
        }
    },
    dataTable: {
        '& .MuiDataGrid-row': {
            cursor: 'default'
        }
    }
};

const DetailPanelExpandIcon = () => <ExpandMore fontSize='medium' />;
const DetailPanelCollapseIcon = () => <ExpandLess fontSize='medium' />;
const CustomToolbar = (rows: DataTableItems[]) =>
    <Typography variant='body2' sx={styles.podTitle}>{`Pod: ${rows[0]?.podName || 'N/A'}`}</Typography>;

type DataTableItems = {
    id: string
    podName: string
    containerName: string
    application: string
    state: string
    age: string
    image: string
    started: string
    restarts: number
};

type DataTableRow = {
    row: DataTableItems
};

type DataTableProps = {
    data: any
    applicationId: string
};

export const DataTable = ({ data, applicationId }: DataTableProps) => {
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

    const DetailPanelContent = ({ row }: DataTableRow) => (
        <Box component={Paper}>
            <PodLogScreen applicationId={row.application} podName={row.podName} containerName={row.containerName} />
        </Box>
    );

    const getDetailPanelHeight = useCallback(() => 'auto', []);

    return (
        data.pods?.flatMap(pod => {
            const items = pod.containers.map((container: ContainerStatusInfo) => {
                return {
                    id: `${pod.name}-${container.name}`,
                    podName: pod.name,
                    containerName: container.name,
                    application: applicationId,
                    image: container.image,
                    state: container.state,
                    started: container.started,
                    age: container.age,
                    restarts: container.restarts
                };
            }) as DataTableItems[];

            return (
                <Box key={items[0]?.id} component={Paper} sx={styles.dataTableWrapper}>
                    <DataGridPro
                        rows={items}
                        columns={columns}
                        disableColumnMenu
                        hideFooter
                        headerHeight={46}
                        getRowHeight={() => 'auto'}
                        autoHeight={true}
                        disableSelectionOnClick
                        getDetailPanelContent={({ row }) => <DetailPanelContent row={row} />}
                        getDetailPanelHeight={getDetailPanelHeight}
                        detailPanelExpandedRowIds={detailPanelExpandedRowIds}
                        onDetailPanelExpandedRowIdsChange={handleDetailPanelExpandedRowIdsChange}
                        sx={styles.dataTable}
                        components={{
                            DetailPanelExpandIcon,
                            DetailPanelCollapseIcon,
                            Toolbar: () => CustomToolbar(items)
                        }}
                    />
                </Box>
            );
        })
    );
};
