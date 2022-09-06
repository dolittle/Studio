// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';

import { Typography } from '@mui/material';

import { getPodLogs, HttpResponsePodLog } from '../api/api';

export const PodLogScreen = ({ applicationId, podName, containerName }: any) => {
    const [data, setData] = useState({ logs: '' } as HttpResponsePodLog);

    useEffect(() => {
        getPodLogs(applicationId, podName, containerName).then(data => {
            setData(data);
            return;
        });
    }, []);

    return (
        <>
            {!data.logs && (
                <Typography variant="body2" sx={{ pl: 7.5, py: 1 }}>
                    There are no logs printed for this microservice.
                </Typography>
            )}

            {data.logs && (
                <pre style={{ padding: '0.5rem 0.625rem 1.1875rem 3rem', margin: '0', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                    {data.logs}
                </pre>
            )}
        </>
    );
};
