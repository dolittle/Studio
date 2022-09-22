// Copyright (c) Dolittle. All rights reserved.
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
        containers: [ 'head', 'runtime' ],
    }
];

const metrics = {
    'microservice:head_container_cpu_usage_seconds:rate_max': {
        range: [0, 2],
        interval: 60,
        per_container: false,
    },
    'default': {
        range: [0, 1],
        interval: 60,
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
            : microservices.map(({labels}) => labels)
    ).map(labels => ({ metric: labels }));

exports.queryInstant = (query, time) => {
    const microservices = findMicroservicesFrom(query.labels);
    const spec = metrics[query.metric] ?? metrics.default;

    const generated = createMetricsFor(microservices, spec.per_container)
        .map(metric => ({
            ...metric,
            value: [
                Number(time/1000n),
                (spec.range[0] + Math.random()*(spec.range[1]-spec.range[0])).toString(),
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

exports.queryRange = (query, from, to, limit, direction) => {
    return {
        status: 'success',
        data: {
            resultType: 'matrix',
            result: grouped.map((group) => ({
                stream: group[0],
                values: group[1].map((_) => [_[0].toString(), _[1]]),
            })),
            stats: {},
        },
    };
};
