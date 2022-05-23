// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ObservableLogLines } from './loki/logLines';

/**
 * The props for a {@link LogPanel} component.
 */
export type LogPanelProps = {
    /**
     * The retrieved logs to render.
     */
    logs: ObservableLogLines<string>;
};

/**
 * A component that renders {@link ObservableLogLines} in a log panel.
 */
export const LogPanel = (props: LogPanelProps) => {
    return (
        <>
            {props.logs.lines.map(line => (
                <div key={line.timestamp}>{line.line}</div>
            ))}
        </>
    );
};
