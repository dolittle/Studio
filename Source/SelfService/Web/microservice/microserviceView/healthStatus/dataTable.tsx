// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useState } from 'react';

import { ContainerStatusInfo } from 'Source/SelfService/Web/api/api';

import { Box, Paper, Typography } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

import { columns } from './dataTableColumns';

import { DataGridPro, DataGridProProps, GridRowId } from '@mui/x-data-grid-pro';

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
        borderRadius: '0 0 0.25rem 0.25rem',
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

const DetailPanelContent = () => (
    <Box component={Paper} sx={{ height: 1 }}>
        <Typography variant="body2" sx={{ pl: 7.5, py: 1 }}>There are no logs printed for this microservice.</Typography>
    </Box>
);

export const DataTable = ({ data }: any) => {
    const [detailPanelExpandedRowIds, setDetailPanelExpandedRowIds] = useState<GridRowId[]>([]);

    const handleDetailPanelExpandedRowIdsChange = (newIds: GridRowId[]) => {
        if (detailPanelExpandedRowIds) {
            // Remove previously expanded row id so only one panel can be expanded at the time.
            newIds = newIds.slice(-1);
            setDetailPanelExpandedRowIds(newIds);
        } else {
            setDetailPanelExpandedRowIds(newIds);
        }
    };

    const getDetailPanelContent = useCallback<NonNullable<DataGridProProps['getDetailPanelContent']>>(() =>
        <DetailPanelContent />, []);
    const getDetailPanelHeight = useCallback(() => 'auto', []);

    return (
        data.pods?.flatMap(pod => {
            const rows = pod.containers.map((container: ContainerStatusInfo, index: number) => {
                const name = index === 0 ? pod.name : '';
                console.log(container)
                return {
                    id: `${pod.name}-${container.name}`,
                    name,
                    image: container.image,
                    state: container.state,
                    started: container.started,
                    age: container.age,
                    restarts: container.restarts,
                };
            });

            return (
                <Box key={rows[0]?.id}>
                    <Box component={Paper} sx={styles.podTitle}>
                        <Typography variant='body2' sx={styles.title}>{`Pod: ${rows[0]?.name || 'N/A'}`}</Typography>
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
                            getDetailPanelHeight={getDetailPanelHeight}
                            getDetailPanelContent={getDetailPanelContent}
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
    )
};
