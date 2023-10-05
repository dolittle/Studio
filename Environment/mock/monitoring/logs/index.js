// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { Router, query } = require('express');
const { parser, LogQL, Expr, LogExpr, Selector, Matcher, Identifier, Eq, Neq, Re, Nre, String, PipelineExpr, PipelineStage, LineFilters, LineFilter, Filter, PipeExact } = require('@grafana/lezer-logql');

const { queryGeneratedLogs, tailGeneratedLogs } = require('./generated');

const routes = module.exports = Router();
require('express-ws')(routes);

const parseQuery = (query) => {
    const parsed = {
        labels: [],
        pipeline: [],
    };
    const node = parser.parse(query).topNode;

    if (node === undefined || !node.type.is(LogQL)) {
        throw new Error('Could not parse LogQL query');
    }

    const selector = node.getChild(Expr)?.getChild(LogExpr)?.getChild(Selector);
    if (selector === null) {
        throw new Error('No Selector found in query');
    }

    const cursor = selector.toTree().cursor();
    do {
        if (!cursor.type.is(Matcher)) continue;

        const matcher = cursor.node;

        const identifier = matcher.getChild(Identifier);
        const comparison = matcher.childAfter(identifier.to);
        const value = matcher.getChild(String);

        parsed.labels.push({
            label: query.slice(selector.from + identifier.from, selector.from + identifier.to),
            operator: comparison.type.id,
            value: query.slice(selector.from + value.from + 1, selector.from + value.to - 1),
        });
    } while (cursor.next())

    const pipeline = node.getChild(Expr)?.getChild(LogExpr)?.getChild(PipelineExpr);
    if (pipeline !== null) {
        const cursor = pipeline.toTree().cursor();
        do {
            if (!cursor.type.is(PipelineStage)) continue;

            const lineFilters = cursor.node.getChild(LineFilters);
            if (lineFilters === null) {
                console.error(`PipelineStage '${query.slice(pipeline.from + cursor.from, pipeline.from + cursor.to)}' is not supported. This filter will be ignored`);
                continue;
            }

            const filterCursor = lineFilters.toTree().cursor();
            do {
                if (!filterCursor.type.is(Filter)) continue;

                const operation = filterCursor.node.firstChild;
                const value = filterCursor.node.parent.getChild(String);

                parsed.pipeline.push({
                    operation: operation.type.id,
                    value: query.slice(pipeline.from + lineFilters.from + value.from + 1, pipeline.from + lineFilters.from + value.to - 1),
                });
            } while (filterCursor.next());
        } while (cursor.next());
    }

    return parsed;
}

routes.get('/query_range', (req, res) => {
    console.log('Getting logs');
    const query = parseQuery(req.query.query);
    const result = queryGeneratedLogs(query, BigInt(req.query.start), BigInt(req.query.end), parseInt(req.query.limit), req.query.direction);
    global.setTimeout(() => {
        res.status(200).json(result).end();
    }, 0);
});

routes.ws('/tail', (ws, req) => {
    console.log('Tailing logs');
    const query = parseQuery(req.query.query);
    const cleanup = tailGeneratedLogs(query, BigInt(req.query.start), parseInt(req.query.limit), req.query.direction, (results) => {
        if (results.streams.length < 1) return;

        ws.send(JSON.stringify(results), (err) => {
            if (err === undefined) return;

            console.error('Failed to send tailing websocket message', err);
            ws.close();
        });
    });

    ws.on('close', cleanup);
});
