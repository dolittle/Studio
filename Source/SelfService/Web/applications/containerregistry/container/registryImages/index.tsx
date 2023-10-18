// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useState } from 'react';

import { Link } from 'react-router-dom';

import { DataGridPro, DataGridProProps, GridColDef, GridRowId } from '@mui/x-data-grid-pro';

import { dataGridDefaultProps, DataGridCustomToolbar, DataGridWrapper, DetailPanelExpandIcon, DetailPanelCollapseIcon, IconButton } from '@dolittle/design-system';

import { ContainerRegistryImages } from '../../../../apis/solutions/containerregistry';

import { DetailPanelIndex } from './detailPanel';

const registryImagesDataGridColumns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Container Images',
        sortable: false,
        minWidth: 300,
    },
];

export type RegistryImagesIndexProps = {
    applicationId: string;
    data: ContainerRegistryImages;
};

export const RegistryImagesIndex = ({ applicationId, data }: RegistryImagesIndexProps) => {
    //TODO: Repeated code from HealthStatusDataGrid.tsx. Move to Design System.
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

    const getDetailPanelContent = useCallback<NonNullable<DataGridProProps['getDetailPanelContent']>>(({ row }) =>
        <DetailPanelIndex applicationId={applicationId} row={row} image={`${data.url}/${row.name}`} />, []);

    const getDetailPanelHeight = useCallback(() => 'auto', []);

    const Toolbar = () =>
        <DataGridCustomToolbar title={`Host: ${data.url}`}>
            <IconButton
                tooltipText='Need to add a new image? Instructions can be found under documentation.'
                icon='InfoRounded'
                sx={{ p: 1, m: 1 }}
                overrides={{
                    component: Link,
                    to: `/setup/application/${applicationId}/overview`,
                }}
            />
        </DataGridCustomToolbar>;

    return (
        <DataGridWrapper>
            <DataGridPro
                {...dataGridDefaultProps}
                rows={data.images}
                columns={registryImagesDataGridColumns}
                getDetailPanelContent={getDetailPanelContent}
                getDetailPanelHeight={getDetailPanelHeight}
                detailPanelExpandedRowIds={detailPanelExpandedRowIds}
                onDetailPanelExpandedRowIdsChange={handleDetailPanelExpandedRowIdsChange}
                getRowId={row => row.name}
                components={{
                    DetailPanelExpandIcon,
                    DetailPanelCollapseIcon,
                    Toolbar,
                }}
            />
        </DataGridWrapper>
    );
};
