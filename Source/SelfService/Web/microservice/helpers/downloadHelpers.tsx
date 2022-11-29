// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useSnackbar } from 'notistack';

import { getPodLogs } from '../../api/api';

import { Link } from '@mui/material';
import { DownloadRounded } from '@mui/icons-material';
import { GridRenderCellParams } from '@mui/x-data-grid-pro';

export const DownloadLogs = (params: GridRenderCellParams) => {
    const [data, setData] = useState({ logs: '' });

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getPodLogs(params.row.application, params.row.podName, params.row.containerName).then(setData);
    }, [params.row.application, params.row.podName, params.row.containerName]);

    const logsBlob = new Blob([data.logs], { type: 'text/plain' });
    const containerImage = params.row.image.replace(':', '/');

    const handleNotification = () => {
        enqueueSnackbar(`'${containerImage}' logs have been downloaded.`);
    };

    return (
        <Link
            href={URL.createObjectURL(logsBlob)}
            download={`${containerImage}.log`}
            onClick={handleNotification}
        >
            <DownloadRounded fontSize='small' sx={{ color: 'text.primary' }} />
        </Link>
    );
};
