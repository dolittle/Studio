// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Tooltip } from '@mui/material';

const fmt = (summary?: number, digits?: number) => {
    if (summary === undefined) {
        return 'N/A';
    }

    if (digits !== undefined) {
        return summary.toFixed(digits);
    }

    return summary.toString();
};

export type SummaryProps = {
    now?: number;
    avg?: number;
    max?: number;
    period: string;
    description?: string;
    digits?: number;
    unit?: string;
};

export const Summary = ({ description, period, avg, digits, max, now, unit }: SummaryProps) => {
    const columnMetric = description ?? '';

    return (
        <Box sx={{ whiteSpace: 'pre' }}>
            <Tooltip title={`Average ${columnMetric} ${period}`}>
                <span>{fmt(avg, digits)}</span>
            </Tooltip>
            {' | '}
            <Tooltip title={`Maximum ${columnMetric} ${period}`}>
                <span>{fmt(max, digits)}</span>
            </Tooltip>
            {' | '}
            <Tooltip title={`Current ${columnMetric}`}>
                <span>{fmt(now, digits)}</span>
            </Tooltip>
            {unit && ' ' + unit}
        </Box>
    );
};
