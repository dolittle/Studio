// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useEffect, useState } from 'react';

import { DataLabels } from './mimir/types';
import { queryRange } from './mimir/queries';

type DataPoint = { time: number, value: number };

export type Metric = {
    labels: DataLabels;
    values: DataPoint[];
};

export type Metrics = {
    loading: boolean;
    metrics: Metric[];
};

export const useMetricsFromLast = (query: string, last: number, step: number): Metrics => {
    const [loading, setLoading] = useState(true);
    const [metrics, setMetrics] = useState<Metric[]>([]);

    useEffect(() => {
        setMetrics([]);
        setLoading(true);

        let aborted = false;

        queryRange({
            query,
            start: Date.now() / 1000 - last,
            end: Date.now() / 1000,
            step,
        }).then((response) => {
            if (aborted) return;

            const metrics = response.data.result.map(metric => ({
                labels: metric.metric,
                values: metric.values.map(point => ({ time: point[0] * 1000, value: parseFloat(point[1]) })),
            }));

            setMetrics(metrics);
            setLoading(false);
        });

        return () => {
            aborted = true;
        };
    }, [query, last, step]);

    return { loading, metrics };
};
