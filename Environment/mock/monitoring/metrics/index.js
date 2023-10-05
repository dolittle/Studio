// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { Router } = require('express');
const { queryInstant, queryRange } = require('./random');
const { parser, PromQL, VectorSelector, MetricIdentifier, LabelMatcher, LabelName, StringLiteral } = require('@prometheus-io/lezer-promql');

const routes = module.exports = Router();
require('express-ws')(routes);

const parseQuery = (query) => {
    const parsed = {
        metric: '',
        labels: [],
    };

    const node = parser.parse(query).topNode;

    if (node === undefined || !node.type.is(PromQL)) {
        throw new Error('Could not parse PromQL query');
    }

    const cursor = node.toTree().cursor();
    do {
        if (!cursor.type.is(VectorSelector)) continue;

        const selector = cursor.node;

        const metricIdentifier = selector.getChild(MetricIdentifier);
        parsed.metric = query.slice(metricIdentifier.from, metricIdentifier.to);

        const labelCursor = selector.toTree().cursor();
        do {
            if (!labelCursor.type.is(LabelMatcher)) continue;

            const matcher = labelCursor.node;

            const identifier = matcher.getChild(LabelName);
            const comparison = matcher.childAfter(identifier.to).firstChild;
            const value = matcher.getChild(StringLiteral);

            parsed.labels.push({
                label: query.slice(selector.from + identifier.from, selector.from + identifier.to),
                operator: comparison.type.id,
                value: query.slice(selector.from + value.from + 1, selector.from + value.to - 1),
            });

        } while (labelCursor.next())

        break;
    } while (cursor.next())

    return parsed;
}

routes.get('/query', (req, res) => {
    console.log('Getting metrics');
    const query = parseQuery(req.query.query);
    const result = queryInstant(query, parseFloat(req.query.time) ?? Date.now() / 1000);
    global.setTimeout(() => {
        res.status(200).json(result).end();
    }, 0);
});

routes.get('/query_range', (req, res) => {
    console.log('Getting metrics');
    const query = parseQuery(req.query.query);
    const result = queryRange(query, parseFloat(req.query.start), parseFloat(req.query.end), parseFloat(req.query.step));
    global.setTimeout(() => {
        res.status(200).json(result).end();
    }, 0);
});
