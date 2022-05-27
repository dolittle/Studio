// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Box } from '@mui/material';
import React from 'react';

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

export type LogLineProps = {
    line: ColoredLine;
};

export const LogLine = (props: LogLineProps) => {
    // TODO: The tab-width is dependent on styling. How do we make sure we don't change this?
    const leadingWhitespace = props.line.leading.spaces + props.line.leading.tabs * 8;
    const leadingEmSpace = `${leadingWhitespace * 0.6}em`;

    return (
        <Box style={{ paddingLeft: leadingEmSpace, textIndent: `-${leadingEmSpace}` }}>
            {props.line.sections.map((section, i) => (
                <span key={i} /*style={coloredLineSectionCss(section)}*/>{section.text}</span>
            ))}
        </Box>
    );
};
