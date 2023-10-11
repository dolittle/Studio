// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useState } from 'react';

import { useNavigate, generatePath } from 'react-router-dom';

import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { DataGridPro, GridRowId, GridRowParams, GridColDef } from '@mui/x-data-grid-pro';

import { dataGridDefaultProps, DataGridCustomToolbar, DataGridWrapper, DetailPanelExpandIcon, DetailPanelCollapseIcon } from '@dolittle/design-system';

import { ContainerRegistryImages } from '../../../apis/solutions/containerregistry';

export const registryImagesDataGridColumns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Container Image',
        minWidth: 300,
        flex: 1,
    },
];

export type RegistryImagesProps = {
    applicationId: string;
    data: ContainerRegistryImages;
};

export const RegistryImages = ({ applicationId, data }: RegistryImagesProps) => {
    const navigate = useNavigate();

    // TODO: Repeated code from HealthStatusDataGrid.tsx. Move to Design System.
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
    const getDetailPanelHeight = useCallback(() => 'auto', []);

    return (
        <>
            <DataGridWrapper>{/* sx={{ mb: 2 }} */}
                <DataGridPro
                    {...dataGridDefaultProps}
                    rows={data.images}
                    columns={registryImagesDataGridColumns}
                    //getDetailPanelContent={({ row }: GridRowParams<HealthStatusDataGridRow>) => <DetailPanelContent row={row} />}
                    getDetailPanelHeight={getDetailPanelHeight}
                    detailPanelExpandedRowIds={detailPanelExpandedRowIds}
                    onDetailPanelExpandedRowIdsChange={handleDetailPanelExpandedRowIdsChange}
                    components={{
                        DetailPanelExpandIcon,
                        DetailPanelCollapseIcon,
                        Toolbar: () => <DataGridCustomToolbar title={data.url} />,
                    }}
                />
            </DataGridWrapper>

            <p>{data.url}</p>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 480 }} aria-label="Docker images" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Name</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.images.map(row => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        const href = generatePath(
                                            // TODO ENV: Removed 'environment' from path. Dunno what that changes.
                                            '/containerregistry/application/:applicationId/overview/tags/:image',
                                            { applicationId, image: encodeURIComponent(row.name) }
                                        );
                                        navigate(href);
                                    }}
                                    sx={{
                                        '&:hover': {
                                            textDecoration: 'underline',
                                            cursor: 'pointer',
                                        }
                                    }}
                                >
                                    {row.name}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
