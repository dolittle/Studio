// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Link } from 'react-router-dom';

import { Button, DataGridCustomToolbar, IconButton, Tooltip } from '@dolittle/design-system';

import { ContainerRegistryImages } from '../../../../apis/solutions/containerregistry';

export type RegistryImagesDataGridToolbarProps = {
    data: ContainerRegistryImages,
    applicationId: string,
};

export const RegistryImagesDataGridToolbar = ({ data, applicationId }: RegistryImagesDataGridToolbarProps) =>
    <DataGridCustomToolbar title={`Host: ${data.url}`}>
        <Tooltip title='Coming soon!' placement='top'>
            <span><Button label='Delete image(s)' startWithIcon='DeleteRounded' disabled sx={{ mr: 1 }} /></span>
        </Tooltip>

        <IconButton
            tooltipText='Need to add a new image? Instructions can be found under documentation.'
            icon='InfoRounded'
            sx={{ p: 1 }}
            overrides={{
                component: Link,
                to: `/setup/application/${applicationId}/overview`,
            }}
        />
    </DataGridCustomToolbar>;
