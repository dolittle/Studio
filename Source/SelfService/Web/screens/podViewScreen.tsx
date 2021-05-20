// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react';

import { getPodLogs, HttpResponsePodLog } from '../api';


const stackTokens = { childrenGap: 15 };

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

// dev-order-846fbc7776-x79rs
export const PodViewScreen: React.FunctionComponent = () => {
    const { applicationId, podName } = useParams() as any;
    const query = useQuery();
    // TODO need to expose the options here
    const containerName = query.has('containerName') ? query.get('containerName') as string : '';
    const [data, setData] = useState({
        applicationId: '',
        podName: '',
        logs: ''
    } as HttpResponsePodLog);

    useEffect(() => {
        getPodLogs(applicationId, podName, containerName).then(data => {
            setData(data);
            return;
        });
    }, []);

    return (
        <>
            <h1>Pod View Screen</h1>

            <Stack tokens={stackTokens}>
                <Text variant="xLarge" block>
                    application: {applicationId}
                </Text>
                <Text variant="xLarge" block>
                    podName: {podName}
                </Text>

                {data.logs !== '' && (
                    <>
                        <pre style={{ whiteSpace: 'pre' }}>
                            {data.logs}
                        </pre>
                    </>
                )}
            </Stack >
        </>
    );
};
