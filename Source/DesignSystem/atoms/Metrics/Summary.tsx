// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';

export type Summary = {
    label: string
    render: () => React.ReactNode
    sx?: any
};

export type SummaryProps = {
    now: number
    avg: number
    max: number
    tooltip: string
    sx?: any
};

export const Summary = (props: SummaryProps) => {
    return (
        <>
            "hello from Summary"
        </>
    );
};
