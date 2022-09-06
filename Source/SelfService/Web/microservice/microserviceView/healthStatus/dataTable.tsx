// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useState } from 'react';

import { ContainerStatusInfo } from 'Source/SelfService/Web/api/api';

import { Box, Paper, Typography } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { DataGridPro, GridRowId, DataGridProProps } from '@mui/x-data-grid-pro';

import { PodLogScreen } from '../../podLogScreen';
import { columns } from './dataTableColumns';

const styles = {
    podTitle: {
        minHeight: 5.75,
        alignContent: 'center',
        alignItems: 'center',
        p: 1.25,
        border: '1px solid rgba(14, 13, 16, 1);',
        borderBottom: 'none',
        borderRadius: '0.25rem 0.25rem 0 0'
    },
    title: {
        fontWeight: 500,
        lineHeight: '1.5rem',
        letterSpacing: '0.17px'
    },
    dataTableWrapper: {
        '& .negativeRowSpanHack': {
            mr: 6.25,
        },
        '& .MuiDataGrid-columnHeader[data-field="__detail_panel_toggle__"]': {
            display: 'none'
        },
        '& .MuiDataGrid-root': {
            borderRadius: '0 0 0.25rem 0.25rem'
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

type DataTableProps = {
    data: any
    applicationId: string
}

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

    const DetailPanelContent = ({ row }) => (
        <Box component={Paper}>
            <PodLogScreen applicationId={applicationId} podName={row.podName} containerName={row.containerName} />
        </Box>
    );

    const getDetailPanelHeight = useCallback(() => 'auto', []);

    return (
        data.pods?.flatMap(pod => {
            const rows = pod.containers.map((container: ContainerStatusInfo) => {
                return {
                    id: `${pod.name}-${container.name}`,
                    podName: pod.name,
                    containerName: container.name,
                    image: container.image,
                    state: container.state,
                    started: container.started,
                    age: container.age,
                    restarts: container.restarts
                };
            });

            return (
                <Box key={rows[0]?.id}>
                    <Box component={Paper} sx={styles.podTitle}>
                        <Typography variant='body2' sx={styles.title}>{`Pod: ${rows[0]?.podName || 'N/A'}`}</Typography>
                    </Box>

                    <Box component={Paper} sx={styles.dataTableWrapper}>
                        <DataGridPro
                            rows={rows}
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
                                DetailPanelCollapseIcon
                            }}
                        />
                    </Box>
                </Box>
            );
        })
    );
};
