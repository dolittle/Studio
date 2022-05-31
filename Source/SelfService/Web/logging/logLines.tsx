// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { TransformedLogLine } from './loki/logLines';

import { ColoredLine } from './lineParsing';
import { LogLine } from './logLine';
import { DataLabels } from './loki/types';

export type LogLinesProps = {
    lines: TransformedLogLine<ColoredLine>[];

    /**
     * Whether or not to display the 'SHOW' context button for each line.
     */
    showContextButtonInLines: boolean;

    /**
     * The callback to call when a 'SHOW' context button is clicked.
     */
    onClickShowContextButton: (timestamp: bigint, labels: DataLabels) => void;
};

export const LogLines = React.memo(function LogLines(props: LogLinesProps) {
    return (
        <>
            {
                props.lines.map(line =>
                    <LogLine
                        key={line.timestamp.toString()}
                        timestamp={line.timestamp}
                        labels={line.labels}
                        line={line.data}
                        enableShowLineContextButton={props.showContextButtonInLines}
                        onClickShowLineContext={props.onClickShowContextButton}
                    />
                )
            }
        </>
    );
});
