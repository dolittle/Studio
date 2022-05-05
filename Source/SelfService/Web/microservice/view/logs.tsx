// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Box, Paper, TextField } from '@mui/material';

type Props = {
    applicationId: string
    environment: string
    microserviceId: string
};

type LokiQuery = {
    pipeline: string
    labels: any
};

type LokiQueryParams = {
    query: LokiQuery
    start?: number
    end?: number
    step?: number
    direction: 'backward' | 'forward'
    limit: number
};

function lokiQueryString(query: LokiQueryParams): string {
    const params: any = { ...query };

    params.query =
        '{' +
        Object.entries(query.query.labels)
            .map(entry => `${entry[0]}="${entry[1]}"`)
            .join(',') +
        '} ' +
        query.query.pipeline;

    return Object.entries(params)
        .map(entry => `${encodeURIComponent(entry[0])}=${encodeURIComponent(entry[1] as any)}`)
        .join('&');
}

type ThrottledState<T> = { realtime: T, throttled: T };

function useThrottledState<T = undefined>(initialState: T | (() => T), throttlingMilliseconds: number): [ThrottledState<T>, Dispatch<SetStateAction<T>>] {
    const [realtime, setRealtime] = useState(initialState);
    const [throttled, setThrottled] = useState(realtime);

    useEffect(() => {
        const timeout = window.setTimeout(() => setThrottled(realtime), throttlingMilliseconds);
        return () => window.clearTimeout(timeout);
    }, [realtime]);

    return [{ realtime, throttled }, setRealtime];
}

type LogLines = [string, string][];

export const Logs: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const applicationId = _props.applicationId;
    const environment = _props.environment;
    const microserviceId = _props.microserviceId;

    const [logLines, setLogLines] = useState<LogLines>([]);
    const [searchText, setSearchText] = useThrottledState('', 1000);

    useEffect(() => {
        const queryString = lokiQueryString({
            query: {
                labels: {
                    job: 'microservice',
                    application_id: applicationId,
                    environment,
                    microservice_id: microserviceId,
                },
                pipeline: searchText.throttled === '' ? '' : `|= "${searchText.throttled}"`,
            },
            start: (Date.now() - 86400000) * 1e6,
            end: Date.now() * 1e6,
            // step: 1,
            limit: 1000,
            direction: 'backward',
        });

        fetch(
            `/api/system/monitoring/logs/v1/query_range?${queryString}`,
            {
                method: 'GET',
                mode: 'cors',
            })
            .then(response => response.json())
            .then(response => {
                if (response.data.result.length > 0) setLogLines(response.data.result[0].values);
                else setLogLines([]);
            });
    }, [applicationId, environment, microserviceId, searchText.throttled]);

    return (
        <Box component={Paper} m={2}>
            <h2>Here come the logs for the last day:</h2>
            <TextField
                id='serach'
                variant='outlined'
                value={searchText.realtime}
                onChange={(event) => setSearchText(event.target.value)}
            />
            <pre style={{ whiteSpace: 'pre' }}>
                {
                    logLines
                        .map(line => {
                            const timestamp = new Date(parseInt(line[0]) / 1e6);
                            const text = line[1].replace(/\u001b[^m]*m/g, ''); // eat all the VT color sequences
                            return `${timestamp.toISOString()}  ${text}`;
                        })
                        .join('\n')
                }
            </pre>
        </Box>
    );
};
