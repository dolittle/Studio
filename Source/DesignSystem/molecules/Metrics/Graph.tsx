// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';
import { createClassFromSpec } from 'react-vega';

import { Paper } from '@mui/material';

const Chart = createClassFromSpec({
    mode: 'vega-lite',
    spec: {
        width: 'container',
        height: 'container',
        background: '#0000',
        mark: {
            type: 'area',
            line: true,
        },
        config: {
            legend: {
                disable: true,
            },
            axis: {
                title: null,
                labelColor: '#CECFD0',
                gridColor: '#504D4D',
                domainColor: '#504D4D',
                tickColor: '#504D4D',
            },
        },
        encoding: {
            x: {
                field: 'time',
                type: 'temporal',
            },
            y: {
                field: 'value',
                type: 'quantitative',
                stack: false,
            },
            color: {
                field: 'index',
                type: 'nominal',
                scale: {
                    range: [
                        '#6678F6', // TODO: Get from theme
                        '#48E0CF',
                    ]
                }
            },
        },
        data: { name: 'table' },
    }
});

type DataPoint = { time: number, value: number };

export type DataSet = {
    group: string;
    name: string;
    values: DataPoint[];
};

export type GraphProps = {
    data: DataSet[];
};

export const Graph = (props: GraphProps) => {
    const table = useMemo(() =>
        props.data.flatMap((dataset, index) => dataset.values.map(datapoint => ({ ...datapoint, index })))
    , props.data);

    return (
        <Paper elevation={1} sx={{ height: 200 }}>
            <Chart
                actions={false}
                style={{ height: '100%', width: '100%' }}
                data={{ table }}
            />
        </Paper>
    );
};
