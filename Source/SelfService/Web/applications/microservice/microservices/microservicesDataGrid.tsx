// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { getPodStatus, MicroserviceObject } from '../../../apis/solutions/api';
import { HttpResponseApplication } from '../../../apis/solutions/application';

import { DataGridPro } from '@mui/x-data-grid-pro';

import { DataGridWrapper, dataGridDefaultProps } from '@dolittle/design-system';

import { microservicesDataGridColumns } from './microservicesDataGridColumns';

export type MicroservicesDataGridProps = {
    application: HttpResponseApplication;
    microservices: MicroserviceObject[];
};

export const MicroservicesDataGrid = ({ application, microservices }: MicroservicesDataGridProps) => {
    const navigate = useNavigate();

    const [microserviceRows, setMicroserviceRows] = useState<(MicroserviceObject | undefined)[]>([]);
    const [isLoadingRows, setIsLoadingRows] = useState(true);

    useEffect(() => {
        setIsLoadingRows(true);

        Promise.all(microservices.map(async microservice => {
            const status = await getMicroserviceStatus(microservice.id, microservice.environment);

            return {
                ...microservice,
                phase: status[0]?.phase,
            } as MicroserviceObject;
        })).then(data => setMicroserviceRows(data))
            .finally(() => setIsLoadingRows(false));
    }, [microservices]);

    const getMicroserviceStatus = useCallback(async (microserviceId: string, environment: string) => {
        const status = await getPodStatus(application.id, environment, microserviceId);
        return status.pods;
    }, [application.id]);

    const handleTableRowClick = (microserviceId: string) => {
        const href = `/microservices/application/${application.id}/view/${microserviceId}`;
        navigate(href);
    };

    return (
        <DataGridWrapper>
            <DataGridPro
                {...dataGridDefaultProps}
                rows={microserviceRows}
                columns={microservicesDataGridColumns}
                loading={isLoadingRows}
                onRowClick={({ row }) => handleTableRowClick(row.id)}
                getRowId={(row) => `${row.id}-${row.environment}`}
            />
        </DataGridWrapper>
    );
};
