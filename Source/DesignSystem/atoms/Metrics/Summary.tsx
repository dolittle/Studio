// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import Tooltip from '@mui/material/Tooltip';

const number = (summary: SummaryValue, digits?: number) => {
    const value = typeof summary === 'number' ? summary : summary.value;
    const formatted = digits !== undefined ? value.toFixed(digits) : value.toString();

    if (typeof summary === 'number' || summary.tooltip === undefined) {
        return <span>{formatted}</span>;
    }

    return (
        <Tooltip title={summary.tooltip}>
            <span>{formatted}</span>
        </Tooltip>
    );
};

type SummaryValue = number | { value: number, tooltip?: string };

export type SummaryProps = {
    now: SummaryValue
    avg: SummaryValue
    max: SummaryValue
    digits?: number;
    unit?: string
};

export const Summary = (props: SummaryProps) => {
    return (
        <>
            { number(props.now, props.digits) } | { number(props.avg, props.digits) } | { number(props.max, props.digits) } {props.unit ?? ''}
        </>
    );
};
