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
        const splitTime = time.split(/[hm.]/g);

        if (time.includes('h') && +splitTime[0] >= 24) {
            const days = Math.floor(+splitTime[0] / 24);
            const hours = +splitTime[0] % 24;
            const minutes = +splitTime[1];
            const seconds = +splitTime[2];

            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else if (time.includes('h')) {
            const hours = +splitTime[0] % 24;
            const minutes = +splitTime[1];
            const seconds = +splitTime[2];

            return `${hours}h ${minutes}m ${seconds}s`;
        } else if (time.includes('m')) {
            const minutes = +splitTime[0];
            const seconds = +splitTime[1];

            return `${minutes}m ${seconds}s`;
        } else if (time.includes('.')) {
            const seconds = +splitTime[0];

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
        const splitDate = initialDate.split(' ');

        const date = splitDate[0].split('-').join('/');
        const time = splitDate[1];

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
        minWidth: 600,
        flex: 1,
    },
    {
        field: 'restarts',
        headerName: 'Restarts',
        sortable: false,
        minWidth: 90,
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
        minWidth: 200,
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
        minWidth: 200,
        flex: 1,
        renderCell: statusCell
    },
    {
        field: 'download',
        headerName: 'Download logs',
        sortable: false,
        minWidth: 100,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: () => <DownloadRounded />
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
        padding: '10px'

    },
    dataTableWrapper: {
        'mt': 2.5,
        '& .negativeRowSpanHack': {
            mr: 6.25,
        },
        '& .MuiDataGrid-columnHeader[data-field="__detail_panel_toggle__"]': {
            display: 'none'
        }
    }
};

type HealthStatusProps = {
    status: string
    data: HttpResponsePodStatus
    environment: string
    applicationId: string
    microserviceId: string
};

type Item = {
    key: string
    name: string
    state: string
    age: string
    image: string
    started: string
    restarts: number
    pod: PodInfo
    container: ContainerStatusInfo
};

export const HealthStatus = ({ applicationId, microserviceId, data, environment }: HealthStatusProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const [detailPanelExpandedRowIds, setDetailPanelExpandedRowIds] = useState<GridRowId[]>([]);

    const handleDetailPanelExpandedRowIdsChange = useCallback((newIds: GridRowId[]) => {
        setDetailPanelExpandedRowIds(newIds);
    }, [],);

    const items: any[] = data.pods.flatMap(pod => {
        return pod.containers.map((container, index) => {
            const name = index === 0 ? pod.name : '';
            const item = {
                key: `${pod.name}-${container.name}`,
                name,
                image: container.image,
                state: container.state,
                started: container.started,
                age: container.age,
                restarts: container.restarts,
                container,
                pod,
                id: `${pod.name}-${container.name}`
            } as Item;

            return item;

            //const podInfo = item!.pod;

            /* return (
                <TableRow key={item.key}>
                    <TableCell align="left">
                        {item.name}
                    </TableCell>
                    <TableCell align="right">{item.state}</TableCell>
                    <TableCell align="right">{item.restarts}</TableCell>
                    <TableCell align="right">{item.age}</TableCell>
                    <TableCell align="right">{item.started}</TableCell>
                    <TableCell align="right">{item.image}</TableCell>
                    <TableCell align="right">
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="stretch"
                        >
                            <div onClick={() => {
                                alert('TODO: Download logs');
                            }}>
                                {DownloadLogIcon}
                            </div>
                            <div onClick={() => {
                                const href = `/microservices/application/${applicationId}/${environment}/pod/view/${podInfo.name}/logs?containerName=${container.name}`;
                                history.push(href);
                            }}>
                                {ViewLogIcon}
                            </div>
                        </Grid>
                    </TableCell>
                </TableRow>
            ); */
        });
    }) as any[];

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

    return (
        <>
            <ButtonText
                sx={styles.restartBtn}
                startIcon={<RestartAlt />}
                onClick={handleRestart}>
                Restart microservice
            </ButtonText>

            <Box component={Paper} sx={styles.dataTableWrapper}>
                <Box component={Paper} sx={styles.podTitle}>
                    <Typography>{`Pod: ${items[0]?.pod?.name || 'N/A'}`}</Typography>
                </Box>

                <DataGridPro
                    rows={items}
                    columns={columns}
                    disableColumnMenu
                    hideFooter
                    headerHeight={46}
                    rowHeight={46}
                    autoHeight={true}
                    disableSelectionOnClick
                    getDetailPanelHeight={getDetailPanelHeight}
                    getDetailPanelContent={getDetailPanelContent}
                    detailPanelExpandedRowIds={detailPanelExpandedRowIds}
                    onDetailPanelExpandedRowIdsChange={handleDetailPanelExpandedRowIdsChange}
                    components={{
                        DetailPanelExpandIcon: ExpandMore,
                        DetailPanelCollapseIcon: ExpandLess,
                    }}
                />
            </Box>
        </>
    );
};
