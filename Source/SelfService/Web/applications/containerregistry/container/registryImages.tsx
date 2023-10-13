// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useEffect, useState } from 'react';

import { useNavigate, generatePath } from 'react-router-dom';

import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { DataGridPro, GridRowId, GridRowParams, GridColDef } from '@mui/x-data-grid-pro';

import {
    dataGridDefaultProps,
    DataGridCustomToolbar,
    DataGridWrapper,
    DetailPanelExpandIcon,
    DetailPanelCollapseIcon,
    Link,
    LoadingSpinner,
} from '@dolittle/design-system';

import { ContainerRegistryImages, ContainerRegistryTags, getTagsInContainerRegistry } from '../../../apis/solutions/containerregistry';

const registryTagDataGridColumns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Tag',
        minWidth: 300,
        flex: 1,
        renderCell: (params) =>
            <Link
                message={params.row.name}
                href={`/microservices/application/${params.row.application}/create?kind=dolittle-microservice#head-image=${encodeURIComponent(params.row.name)}:${params.row.name}`}
            />
    },
    {
        field: 'createdTime',
        headerName: 'Created At',
        minWidth: 300,
        flex: 1,
        valueFormatter: (params) => params.value.toLocaleString(),
    },
    {
        field: 'lastUpdateTime',
        headerName: 'Updated At',
        minWidth: 300,
        flex: 1,
        valueFormatter: (params) => params.value.toLocaleString(),
    },
    {
        field: 'digest',
        headerName: 'Digest',
        minWidth: 300,
        flex: 1,
        renderCell: (params) =>
            <Link
                message={params.row.name}
                href={`/microservices/application/${params.row.application}/create?kind=dolittle-microservice#head-image=${encodeURIComponent(params.row.name)}:${params.row.name}@${params.row.digest}`}
            />
    },
    {
        field: 'signed',
        headerName: 'Signed',
        minWidth: 300,
        flex: 1,
        valueGetter: (params) => params.row.signed ? 'true' : 'false',
    },
];

const DetailPanelContent = ({ row }: GridRowParams) => {
    const [containerRegistryTags, setContainerRegistryTags] = useState({
        name: '',
        tags: [],
    } as ContainerRegistryTags);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([getTagsInContainerRegistry(row.application, row.name)])
            .then(values => setContainerRegistryTags(values[0]))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <LoadingSpinner />;

    return (
        <DataGridWrapper>
            <DataGridPro
                {...dataGridDefaultProps}
                rows={containerRegistryTags.tags}
                columns={registryTagDataGridColumns}
                getRowId={row => row.name}
            />
        </DataGridWrapper>
    );
};

const registryImagesDataGridColumns: GridColDef[] = [
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
    const getDetailPanelHeight = useCallback(() => 'auto', []);

    return (
        <>
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

            <DataGridWrapper>
                <DataGridPro
                    {...dataGridDefaultProps}
                    rows={data.images}
                    columns={registryImagesDataGridColumns}
                    getDetailPanelContent={DetailPanelContent}
                    getDetailPanelHeight={getDetailPanelHeight}
                    detailPanelExpandedRowIds={detailPanelExpandedRowIds}
                    onDetailPanelExpandedRowIdsChange={handleDetailPanelExpandedRowIdsChange}
                    getRowId={row => row.name}
                    components={{
                        DetailPanelExpandIcon,
                        DetailPanelCollapseIcon,
                        Toolbar: () => <DataGridCustomToolbar title={data.url} />,
                    }}
                />
            </DataGridWrapper>
        </>
    );
};
