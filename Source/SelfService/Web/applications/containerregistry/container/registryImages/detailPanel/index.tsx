// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Box, CircularProgress } from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';

import { dataGridDefaultProps, DataGridWrapper } from '@dolittle/design-system';

import { ContainerRegistryTags, getTagsInContainerRegistry, Tag } from '../../../../../apis/solutions/containerregistry';

import { getDetailPanelColumns } from './DetailPanelColumns';

export type DetailPanelIndexProps = {
    applicationId: string;
    image: string;
    row: Tag;
};

export const DetailPanelIndex = ({ applicationId, image, row }: DetailPanelIndexProps) => {
    const [containerRegistryTags, setContainerRegistryTags] = useState({
        name: '',
        tags: [],
    } as ContainerRegistryTags);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([getTagsInContainerRegistry(applicationId, row.name)])
            .then(values => setContainerRegistryTags(values[0]))
            .finally(() => setIsLoading(false));
    }, []);

    const detailPanelColumns = getDetailPanelColumns(applicationId, image);

    return (
        <DataGridWrapper>
            {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}

            <DataGridPro
                {...dataGridDefaultProps}
                rows={containerRegistryTags.tags}
                columns={detailPanelColumns}
                getRowId={row => row.name}
            />
        </DataGridWrapper>
    );
};
