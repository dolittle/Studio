// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useNavigate } from 'react-router-dom';

import { DataGridPro } from '@mui/x-data-grid-pro';

import { dataGridDefaultProps, DataGridWrapper } from '@dolittle/design-system';

import { ConnectionModel } from '../../apis/integrations/generated';

import { connectionsDataGridColumns } from './ConnectionsDataGridColumns';

export type ConnectionsDataGridProps = {
    connections: ConnectionModel[];
    isLoading: boolean;
};

export const ConnectionsDataGrid = ({ connections, isLoading }: ConnectionsDataGridProps) => {
    const navigate = useNavigate();

    const handleRowClick = (connectionModel: ConnectionModel) => {
        if (connectionModel.connectionId) {
            //TODO: Redirect correctly based on status
            const href = connectionModel.connectionId;
            navigate(href);
        }
    };

    return (
        <DataGridWrapper>
            <DataGridPro
                {...dataGridDefaultProps}
                rows={connections}
                columns={connectionsDataGridColumns}
                loading={isLoading}
                onRowClick={({ row }) => handleRowClick(row)}
            />
        </DataGridWrapper>
    );
};
