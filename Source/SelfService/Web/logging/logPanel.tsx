// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ObservableLogLines } from './loki/logLines';

import { ColoredLine, ColoredLineSection, TerminalColor } from './lineParsing';

const coloredLineSectionCss = (section: ColoredLineSection): React.CSSProperties => {
    let color = 'inherit', backgroundColor = 'inherit';

    switch (section.foreground) {
        case TerminalColor.Black:
            color = 'black';
            break;
        case TerminalColor.Blue:
            color = 'blue';
            break;
        case TerminalColor.Cyan:
            color = 'cyan';
            break;
        case TerminalColor.Green:
            color = 'green';
            break;
        case TerminalColor.Magenta:
            color = 'magenta';
            break;
        case TerminalColor.Red:
            color = 'red';
            break;
        case TerminalColor.White:
            color = 'white';
            break;
        case TerminalColor.Yellow:
            color = 'yellow';
            break;
    }

    switch (section.background) {
        case TerminalColor.Black:
            backgroundColor = 'black';
            break;
        case TerminalColor.Blue:
            backgroundColor = 'blue';
            break;
        case TerminalColor.Cyan:
            backgroundColor = 'cyan';
            break;
        case TerminalColor.Green:
            backgroundColor = 'green';
            break;
        case TerminalColor.Magenta:
            backgroundColor = 'magenta';
            break;
        case TerminalColor.Red:
            backgroundColor = 'red';
            break;
        case TerminalColor.White:
            backgroundColor = 'white';
            break;
        case TerminalColor.Yellow:
            backgroundColor = 'yellow';
            break;
    }

    return { color, backgroundColor };

};

/**
 * The props for a {@link LogPanel} component.
 */
export type LogPanelProps = {
    /**
     * The retrieved logs to render.
     */
    logs: ObservableLogLines<ColoredLine>;
};

/**
 * A component that renders {@link ObservableLogLines} in a log panel.
 */
export const LogPanel = (props: LogPanelProps) => {
    return (
        <>
            {props.logs.lines.map(line => (
                <pre key={line.timestamp}>
                    {line.data.sections.map((section, i) => (
                        <span key={i} style={coloredLineSectionCss(section)}>{section.text}</span>
                    ))}
                </pre>
            ))}
        </>
    );
};
