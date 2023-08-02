// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { getPodStatus, MicroserviceObject } from '../../../apis/solutions/api';
import { HttpResponseApplication } from '../../../apis/solutions/application';

import { DataGridPro } from '@mui/x-data-grid-pro';

import { DataGridWrapper, dataGridDefaultProps } from '@dolittle/design-system';

import { microservicesTableColumns } from './microservicesTableColumns';

export type MicroserviceTableProps = {
    environment: string;
    application: HttpResponseApplication;
    microservices: MicroserviceObject[];
};

export const MicroserviceTable = ({ application, environment, microservices }: MicroserviceTableProps) => {
    const navigate = useNavigate();

    const [microserviceRows, setMicroserviceRows] = useState<(MicroserviceObject | undefined)[]>([]);
    const [loadingRows, setLoadingRows] = useState(true);

    const getMicroserviceStatus = useCallback(async (microserviceId: string) => {
        const status = await getPodStatus(application.id, environment, microserviceId);
        return status.pods;
    }, [application.id, environment]);

    useEffect(() => {
        setLoadingRows(true);
        Promise.all(microservices.map(async microservice => {
            const status = await getMicroserviceStatus(microservice.id);

            return {
                ...microservice,
                phase: status[0]?.phase,
            } as MicroserviceObject;
        })).then(data => setMicroserviceRows(data))
            .finally(() => setLoadingRows(false));
    }, [microservices]);

    const handleTableRowClick = (microserviceId: string) => {
        const href = `/microservices/application/${application.id}/${environment}/view/${microserviceId}`;
        navigate(href);
    };

    return (
        <DataGridWrapper>
            <DataGridPro
                {...dataGridDefaultProps}
                rows={microserviceRows}
                columns={microservicesTableColumns}
                loading={loadingRows}
                onRowClick={({ row }) => handleTableRowClick(row.id)}
            />
        </DataGridWrapper>
    );
};
