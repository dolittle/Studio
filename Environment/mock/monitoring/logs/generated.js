// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { Eq, Neq, PipeExact } = require('@grafana/lezer-logql');
const Jabber = require('jabber');

const streams = [
    {
        job: 'microservice',
        application_id: '11b6cf47-5d9f-438f-8116-0d9828654657',
        application: 'Taco',
        environment: 'Dev',
        microservice_id: '7e78b802-e246-467b-9946-1deabf8042ef',
        microservice: 'Welcome',
    },
    {
        job: 'microservice',
        application_id: '11b6cf47-5d9f-438f-8116-0d9828654657',
        application: 'Taco',
        environment: 'Dev',
        microservice_id: '16965610-e419-40f1-b550-4841e93553b9',
    },
    {
        job: 'microservice',
        application_id: '11b6cf47-5d9f-438f-8116-0d9828654657',
        application: 'Taco',
        environment: 'Prod',
        microservice_id: '7e78b802-e246-467b-9946-1deabf8042ef',
        microservice: 'Welcome',
    },
];

const generator = new Jabber([
    'error',
    'err',
    'warning',
    'warn',
    'critical',
    'crit',
    'debug',
    'dbg',
    'info',
    'trace',
    'trc',
    'failed',
    'failure',
    'exception',
    'Exception',
]);

const generateRandomLogs = () => {
    const generateLinesFrom = Math.floor(
        new Date(Date.now()).setHours(0, 0, 0, 0) / 1000
    );
    const generateLinesTo = Math.floor(Date.now() / 1000);

    const lines = [];
    for (let t = generateLinesFrom; t <= generateLinesTo; t += 2) {
        lines.push({
            stream: streams[Math.floor(Math.random() * streams.length)],
            line: [BigInt(t) * 1_000_000_000n, generator.createParagraph(20)],
        });
    }
    console.log('Generated', lines.length, 'random log lines');
    return lines;
};

const generateRandomLogsEveryOtherSecond = (lines) => {
    global.setInterval(() => {
        lines.push({
            stream: streams[Math.floor(Math.random() * streams.length)],
            line: [BigInt(Date.now()) * 1_000_000n, generator.createParagraph(20)],
        });
    }, 2000);
};

const generated = generateRandomLogs();
generateRandomLogsEveryOtherSecond(generated);

exports.queryGeneratedLogs = (query, from, to, limit, direction) => {
    const filtered = generated.filter(({ stream, line }) => {
        if (line[0] < from || line[0] > to) {
            return false;
        }

        for (const { label, operator, value } of query.labels) {
            switch (operator) {
                case Eq:
                    if (stream[label] !== value) return false;
                    break;
                case Neq:
                    if (stream[label] === value) return false;
                    break;
                default:
                    console.error(
                        `Selector operator ${operator} is not implemented (label: ${label}, value: ${value}). This filter will be ignored.`
                    );
                    break;
            }
        }

        for (const { operation, value } of query.pipeline) {
            switch (operation) {
                case PipeExact:
                    if (!line[1].includes(value)) return false;
                    break;
                case Neq:
                    if (line[1].includes(value)) return false;
                    break;
                default:
                    console.error(
                        `Pipeline operation ${operation} is not implemented. This filter will be ignored.`
                    );
                    break;
            }
        }

        return true;
    });

    let limited = filtered;
    if (limited.length > limit) {
        if (direction === 'forward') {
            limited = filtered.slice(0, limit);
        } else {
            limited = filtered.slice(-limit);
        }
    }

    const grouped = [];
    grouping: for (const entry of limited) {
        for (const [stream, entries] of grouped) {
            if (stream === entry.stream) {
                entries.push(entry.line);
                continue grouping;
            }
        }
        grouped.push([entry.stream, [entry.line]]);
    }

    return {
        status: 'success',
        data: {
            resultType: 'streams',
            result: grouped.map((group) => ({
                stream: group[0],
                values: group[1].map((_) => [_[0].toString(), _[1]]),
            })),
            stats: {},
        },
    };
};

exports.tailGeneratedLogs = (query, start, limit, direction, callback) => {
    const sendResults = (result) => {
        callback({ streams: result.data.result });
    };

    const now = BigInt(Date.now()) * 1_000_000n;
    const initialResult = exports.queryGeneratedLogs(query, start, now, limit, direction);
    sendResults(initialResult);

    let nextFrom = now;
    const handle = global.setInterval(() => {
        const now = BigInt(Date.now()) * 1_000_000n;

        const result = exports.queryGeneratedLogs(query, nextFrom, now, limit, direction);
        sendResults(result);
        nextFrom = now;
    }, 2000);

    return () => global.clearInterval(handle);
};
