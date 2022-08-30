// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { HttpResponsePodStatus, PodInfo, ContainerStatusInfo, restartMicroservice } from '../../api/api';
import { useSnackbar } from 'notistack';

import { Box, Paper, Typography } from '@mui/material';
import { DownloadRounded, RestartAlt, ExpandMore, ExpandLess } from '@mui/icons-material';
import { ButtonText } from '../../theme/buttonText';

import {
    DataGridPro,
    DataGridProProps,
    GridColDef,
    GridRowId,
    GridValueGetterParams,
    gridDetailPanelExpandedRowsContentCacheSelector,
    useGridSelector,
    useGridApiContext,
    GRID_DETAIL_PANEL_TOGGLE_COL_DEF,
    GridRenderCellParams
} from '@mui/x-data-grid-pro';

import { statusCell } from '../microserviceStatus';

const DetailPanelContent = () => (
    <Box component={Paper} sx={{ height: '100%' }}>
        <Typography variant="body2" sx={{ pl: 7.5, py: 1 }}>There are no logs printed for this microservice.</Typography>
    </Box>
);

const formatTime = (time: string) => {
    if (time) {
        const splitedTime = time.split(/[hm.]/g);

        if (time.includes('h') && +splitedTime[0] >= 24) {
            const days = Math.floor(+splitedTime[0] / 24);
            const hours = +splitedTime[0] % 24;
            const minutes = +splitedTime[1];
            const seconds = +splitedTime[2];

            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else if (time.includes('h')) {
            const hours = +splitedTime[0] % 24;
            const minutes = +splitedTime[1];
            const seconds = +splitedTime[2];

            return `${hours}h ${minutes}m ${seconds}s`;
        } else if (time.includes('m')) {
            const minutes = +splitedTime[0];
            const seconds = +splitedTime[1];

            return `${minutes}m ${seconds}s`;
        } else if (time.includes('.')) {
            const seconds = +splitedTime[0];

            return `${seconds}s`;
        } else {
            return 'N/A';
        }
    } else {
        return 'N/A';
    }
};

const formatStartingDate = (initialDate: string) => {
    if (initialDate) {
        const splitedDate = initialDate.split(' ');
        const date = splitedDate[0].split('-').join('/');
        const time = splitedDate[1];

        return `${date} ${time}`;
    } else {
        return 'N/A';
    }
};

const columns: GridColDef[] = [
    {
        field: 'image',
        headerName: 'Container',
        headerClassName: 'negativeRowSpanHack',
        sortable: false,
        minWidth: 584,
        flex: 1,
    },
    {
        field: 'restarts',
        headerName: 'Restarts',
        sortable: false,
        minWidth: 100,
        flex: 1,
        headerAlign: 'right',
        align: 'right'
    },
    {
        field: 'age',
        headerName: 'Age',
        sortable: false,
        minWidth: 180,
        flex: 1,
        headerAlign: 'right',
        align: 'right',
        valueGetter: (params: GridValueGetterParams) =>
            formatTime(params.row?.age)
    },
    {
        field: 'started',
        headerName: 'Started',
        sortable: false,
        minWidth: 216,
        flex: 1,
        headerAlign: 'right',
        align: 'right',
        valueGetter: (params: GridValueGetterParams) =>
            formatStartingDate(params.row?.started)
    },
    {
        field: 'state',
        headerName: 'Status',
        sortable: false,
        minWidth: 168,
        flex: 1,
        renderCell: statusCell
    },
    {
        field: 'download',
        headerName: 'Download logs',
        sortable: false,
        minWidth: 132,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: () => <DownloadRounded fontSize='small' />
    },
];

const styles = {
    restartBtn: {
        fontWeight: 500,
        lineHeight: '22px',
        letterSpacing: '0.06em'
    },
    podTitle: {
        minHeight: '46px',
        alignContent: 'center',
        alignItems: 'center',
        padding: '10px',
        mt: 2.5,
        border: '1px solid rgba(14, 13, 16, 1);',
        borderBottom: 'none',
        borderRadius: '4px 4px 0 0'
    },
    title: {
        fontWeight: 500,
        lineHeight: '24px',
        letterSpacing: '0.17px',
    },
    dataTableWrapper: {
        borderRadius: '0 0 4px 4px',
        '& .negativeRowSpanHack': {
            mr: 6.25,
        },
        '& .MuiDataGrid-columnHeader[data-field="__detail_panel_toggle__"]': {
            display: 'none'
        },
        '& .MuiDataGrid-root': {
            borderRadius: '0 0 4px 4px'
        }
    },
    dataTable: {
        '& .MuiDataGrid-row': {
            cursor: 'default'
        },
    }
};

type HealthStatusProps = {
    status: string;
    data: any;
    environment: string;
    applicationId: string;
    microserviceId: string;
};

export const HealthStatus = ({ applicationId, microserviceId, data, environment }: HealthStatusProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const [detailPanelExpandedRowIds, setDetailPanelExpandedRowIds] = useState<GridRowId[]>([]);

    const handleDetailPanelExpandedRowIdsChange = (newIds: GridRowId[]) => {
        if (detailPanelExpandedRowIds.length) {
            // Remove previosly expanded row id
            newIds = newIds.slice(-1);
            setDetailPanelExpandedRowIds(newIds);
        } else {
            setDetailPanelExpandedRowIds(newIds);
        }
    };

    //const podInfo = item!.pod;
    // const href = `/microservices/application/${applicationId}/${environment}/pod/view/${podInfo.name}/logs?containerName=${container.name}`;

    //console.log(items)

    const handleRestart = async () => {
        const success = await restartMicroservice(applicationId, environment, microserviceId);

        if (!success) {
            enqueueSnackbar('Failed to restart microservice', { variant: 'error' });
            return;
        }

        window.location = window.location;
    };

    const getDetailPanelContent = useCallback<NonNullable<DataGridProProps['getDetailPanelContent']>>(() =>
        <DetailPanelContent />, []);
    const getDetailPanelHeight = useCallback(() => 'auto', []);

    const DetailPanelExpandIcon = () => <ExpandMore fontSize='medium' />;
    const DetailPanelCollapseIcon = () => <ExpandLess fontSize='medium' />;

    return (
        <>
            <ButtonText
                sx={styles.restartBtn}
                startIcon={<RestartAlt />}
                onClick={handleRestart}>
                Restart microservice
            </ButtonText>

            <Box component={Paper} sx={styles.podTitle}>
                <Typography variant='body2' sx={styles.title}>{`Pod: ${data[0]?.name || 'N/A'}`}</Typography>
            </Box>

            <Box component={Paper} sx={styles.dataTableWrapper}>
                <DataGridPro
                    rows={data}
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
        </>
    );
};
