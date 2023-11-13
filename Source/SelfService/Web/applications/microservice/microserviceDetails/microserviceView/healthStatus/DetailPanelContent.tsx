// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { DataGridDetailPanel, LoadingSpinner } from '@dolittle/design-system';

import { getPodLogs, HttpResponsePodLog } from '../../../../../apis/solutions/api';

import { HealthStatusDataGridRow } from './HealthStatusDataGrid';

export type DetailPanelContentProps = {
    row: HealthStatusDataGridRow;
};

export const DetailPanelContent = ({ row }: DetailPanelContentProps) => {
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
