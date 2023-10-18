// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useHref } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { GridColDef } from '@mui/x-data-grid-pro';

import { Button, IconButton } from '@dolittle/design-system';

import { Tag } from '../../../../../apis/solutions/containerregistry';

export const getDetailPanelColumns = (applicationId: string, image: string) => {
    const DeployMicroserviceCell = (row: Tag) => {
        const microserviceHref = useHref(`/microservices/application/${applicationId}/create?kind=dolittle-microservice#head-image=${image}:${row?.name}`);

        return (
            <Button label='Deploy new Microservice' variant='outlined' href={microserviceHref} />
        );
    };

    const CopyImageCell = (row: Tag) => {
        const { enqueueSnackbar } = useSnackbar();

        const handleImageCopy = () => {
            navigator.clipboard.writeText(`${image}:${row?.name}@${row?.digest}`);
            enqueueSnackbar(`Tag '${row?.name}' has been copied to clipboard.`);
        };

        return (
            <IconButton tooltipText='Copy head image' icon='CopyAllRounded' onClick={handleImageCopy} />
        );
    };

    return [
        {
            field: 'name',
            headerName: 'Tag',
            minWidth: 150,
            flex: 1,
        },
        {
            field: 'createdTime',
            headerName: 'Created At',
            minWidth: 250,
            flex: 1,
            valueFormatter: ({ value }) => value?.toLocaleString() || 'N/A',
        },
        {
            field: 'digest',
            headerName: 'Digest',
            minWidth: 400,
            flex: 1,
        },
        {
            field: 'deploy-microservice',
            headerName: 'Deploy Microservice',
            sortable: false,
            headerAlign: 'center',
            align: 'center',
            minWidth: 250,
            flex: 1,
            renderCell: ({ row }) => DeployMicroserviceCell(row),
        },
        {
            field: 'copy-head-image',
            headerName: 'Copy',
            sortable: false,
            headerAlign: 'center',
            align: 'center',
            minWidth: 150,
            flex: 1,
            renderCell: ({ row }) => CopyImageCell(row),
        },
    ] as GridColDef<Tag>[];
};
