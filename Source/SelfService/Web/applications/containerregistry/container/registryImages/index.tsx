// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useState } from 'react';

import { DataGridPro, DataGridProProps, GridColDef, GridRowId } from '@mui/x-data-grid-pro';

import { dataGridDefaultProps, DataGridWrapper, DetailPanelExpandIcon, DetailPanelCollapseIcon } from '@dolittle/design-system';

import { ContainerRegistryImages } from '../../../../apis/solutions/containerregistry';

import { RegistryImagesDataGridToolbar } from './RegistryImagesDataGridToolbar';
import { DetailPanelDataGrid } from './detailPanel/DetailPanelDataGrid';

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
        <DetailPanelDataGrid applicationId={applicationId} row={row} image={`${data.url}/${row.name}`} />, []);

    const getDetailPanelHeight = useCallback(() => 'auto', []);

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
                    Toolbar: () => <RegistryImagesDataGridToolbar data={data} applicationId={applicationId} />,
                }}
            />
        </DataGridWrapper>
    );
};
