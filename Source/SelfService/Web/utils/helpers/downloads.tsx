// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useSnackbar } from 'notistack';

import { getPodLogs } from '../../apis/solutions/api';

import { GridRenderCellParams } from '@mui/x-data-grid-pro';

import { IconButton } from '@dolittle/design-system';

type DownloadHelperProps = {
    row: GridRenderCellParams['row'];
};

export const DownloadLogs = ({ row: { application, podName, containerName, image } }: DownloadHelperProps) => {
    const [data, setData] = useState({ logs: '' });

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getPodLogs(application, podName, containerName).then(setData);
    }, [application, podName, containerName]);

    const logsBlob = new Blob([data.logs], { type: 'text/plain' });
    const containerImage = image.replace(':', '/');

    const handleNotification = () => {
        enqueueSnackbar(`'${containerImage}' logs have been downloaded.`);
    };

    return (
        <IconButton
            tooltipText='Download logs'
            icon='DownloadRounded'
            href={URL.createObjectURL(logsBlob)}
            download={`${containerImage}.log`}
            onClick={handleNotification}
        />
    );
};
