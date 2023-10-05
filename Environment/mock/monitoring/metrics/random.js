// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { EqlSingle, Neq } = require('@prometheus-io/lezer-promql');

const microservices = [
    {
        labels: {
            application: 'Taco',
            application_id: '11b6cf47-5d9f-438f-8116-0d9828654657',
            environment: 'Dev',
            microservice: 'Welcome',
            microservice_id: '7e78b802-e246-467b-9946-1deabf8042ef',
        },
        containers: ['head', 'runtime'],
    }
];

const metrics = {
    'microservice:container_cpu_usage_seconds:rate_max': {
        range: [0, 2],
        rate: 0.1,
        step: 60,
        per_container: true,
    },
    'microservice:container_memory_working_set_bytes:max': {
        range: [52_428_800, 2_147_483_648],
        rate: 10_048_576,
        step: 60,
        per_container: true,
    },
    'default': {
        range: [0, 1],
        rate: 0.01,
        step: 60,
        per_container: false,
    }
}

const findMicroservicesFrom = (labels) =>
    microservices.filter(microservice => {
        for (const { label, operator, value } of labels) {
            switch (operator) {
                case EqlSingle:
                    if (microservice.labels[label] !== value) return false;
                    break;
                case Neq:
                    if (microservice.labels[label] === value) return false;
                    break;
                default:
                    console.error(
                        `Selector operator ${operator} is not implemented (label: ${label}, value: ${value}). This filter will be ignored.`
                    );
                    break;
            }
        }

        return true;
    });

const createMetricsFor = (microservices, perContainer) =>
    (
        perContainer
            ? microservices.flatMap(({ labels, containers }) => containers.map(container => ({ container, ...labels })))
            : microservices.map(({ labels }) => labels)
    ).map(labels => ({ metric: labels }));

exports.queryInstant = (query, time) => {
    const microservices = findMicroservicesFrom(query.labels);
    const spec = metrics[query.metric] ?? metrics.default;

    const generated = createMetricsFor(microservices, spec.per_container)
        .map(metric => ({
            ...metric,
            value: [
                time,
                (spec.range[0] + Math.random() * (spec.range[1] - spec.range[0])).toString(),
            ]
        }));

    return {
        status: 'success',
        data: {
            resultType: 'vector',
            result: generated,
        },
    };
};

exports.queryRange = (query, start, end, step) => {
    const microservices = findMicroservicesFrom(query.labels);
    const spec = metrics[query.metric] ?? metrics.default;

    step = Math.max(step, spec.step);

    const generated = createMetricsFor(microservices, spec.per_container)
        .map(metric => {
            const values = [];

            let time = start;
            let value = spec.range[0] + Math.random() * (spec.range[1] - spec.range[0]);
            while (time <= end) {
                values.push([
                    time,
                    value.toString(),
                ]);

                time += step;

                value += Math.random() * spec.rate - spec.rate / 2;
                value = Math.max(spec.range[0], Math.min(spec.range[1], value))
            }

            return { ...metric, values };
        });

    return {
        status: 'success',
        data: {
            resultType: 'matrix',
            result: generated,
        },
    };
};
