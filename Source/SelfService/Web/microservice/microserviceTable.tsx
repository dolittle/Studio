// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getPodStatus, MicroserviceInfo } from '../api/api';
import { HttpResponseApplication } from '../api/application';
import { StatusFieldCell, customStatusFieldSort } from './microserviceStatus';

import { DataGridPro, GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid-pro';
import { Paper, Tooltip } from '@mui/material';

import { capitalize, removeFromString } from './helpers';

const sortByRuntimeVersion = (params: GridValueGetterParams) => {
    const runtimeVersion = removeFromString(params.row.edit?.extra?.runtimeImage, /dolittle\/runtime:/gi);
    if (typeof runtimeVersion !== 'string') {
        return 'N/A';
    }

    return capitalize(runtimeVersion);
};

const PublicUrlCell = (params: GridRenderCellParams) => {
    const hasPublicUrl = params.row.edit?.extra?.isPublic;

    return (
        // TODO: Tooltip needs public urls. Map them into title.
        <Tooltip title={``} arrow>
            <span>
                {hasPublicUrl === true ? 'Available' :
                    hasPublicUrl === false ? 'None' :
                        'N/A'
                }
            </span>
        </Tooltip>
    );
};

export type MicroserviceObject = {
    id: string;
    name: string;
    kind: string;
    environment: string;
    live: MicroserviceInfo;
    edit: {
        extra?: {
            isPublic: boolean;
        };
    };
    phase?: string;
};

type MicroserviceTableProps = {
    environment: string;
    application: HttpResponseApplication;
    microservices: MicroserviceObject[];
};

export const MicroserviceTable = ({ application, environment, microservices }: MicroserviceTableProps) => {
    const history = useHistory();
    const [microserviceRows, setMicroserviceRows] = useState<(MicroserviceObject | undefined)[]>([]);
    const [loadingRows, setLoadingRows] = useState(true);

    const getMicroserviceStatus = useCallback(async (microserviceId: string) => {
        const status = await getPodStatus(application.id, environment, microserviceId);
        return status.pods;
    }, [application.id, environment]);

    useEffect(() => {
        Promise.all(microservices.map(async microservice => {
            const status = await getMicroserviceStatus(microservice.id);

            return {
                ...microservice,
                phase: status[0]?.phase
            } as MicroserviceObject;
        })).then(data => {
            setMicroserviceRows(data);
            setLoadingRows(false);
        });

    }, []);

    const customUrlFieldSort = (v1, v2, param1, param2) => {
        const firstObject = microserviceRows.filter(row => row?.id === param1.id);
        const secondObject = microserviceRows.filter(row => row?.id === param2.id);

        const isFirstPublic = firstObject[0]?.edit?.extra?.isPublic;
        const isSecondPublic = secondObject[0]?.edit?.extra?.isPublic;

        const compareFirst = isFirstPublic ? 'Available' : 'None';
        const compareSecond = isSecondPublic ? 'Available' : 'None';

        return compareFirst.localeCompare(compareSecond);
    };

    const microserviceColumns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 270,
            flex: 1,
        },
        {
            field: 'image',
            headerName: 'Container Image',
            minWidth: 270,
            flex: 1,
            valueGetter: (params: GridValueGetterParams) =>
                `${params.row.edit?.extra?.headImage || 'N/A'}`
        },
        {
            field: 'runtime',
            headerName: 'Runtime',
            minWidth: 270,
            flex: 1,
            valueGetter: sortByRuntimeVersion
        },
        {
            field: 'isPublic',
            headerName: 'Public URL',
            minWidth: 270,
            flex: 1,
            renderCell: PublicUrlCell,
            sortComparator: customUrlFieldSort
        },
        {
            field: 'phase',
            headerName: 'Status',
            minWidth: 270,
            flex: 1,
            renderCell: StatusFieldCell,
            sortComparator: customStatusFieldSort
        }
    ];

    const onTableRowClick = (microserviceId: string) => {
        const href = `/microservices/application/${application.id}/${environment}/view/${microserviceId}`;
        history.push(href);
    };

    return (
        <Paper sx={{ width: 1 }}>
            <DataGridPro
                rows={microserviceRows}
                columns={microserviceColumns}
                getRowHeight={() => 'auto'}
                autoHeight={true}
                headerHeight={46}
                disableColumnMenu
                hideFooter
                disableSelectionOnClick
                loading={loadingRows}
                onRowClick={params => onTableRowClick(params.row.id)}
            />
        </Paper>
    );
};
