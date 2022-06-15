// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Box, Skeleton } from '@mui/material';
import { format } from 'date-fns';

import { ColoredLine, ColoredLineSection, TerminalColor } from './lineParsing';
import { ButtonText } from '../theme/buttonText';
import { DataLabels } from './loki/types';

const coloredLineSectionCss = (section: ColoredLineSection): React.CSSProperties => {
    let color = 'inherit',
        backgroundColor = 'inherit';

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
    loading?: boolean;
    timestamp: bigint;
    labels: DataLabels;
    line: ColoredLine;
    enableShowLineContextButton: boolean;
    onClickShowLineContext: (
        timestamp: bigint,
        labels: DataLabels,
        event: React.MouseEvent<HTMLElement, MouseEvent>
    ) => void;
};

const formatTimestamp = (timestamp: bigint): string => {
    const date = new Date(Number(timestamp / 1_000_000n));
    return format(date, '[yyyy-MM-dd HH:mm:ss]');
};

const SkeletonWhenLoading = (props: { loading?: boolean; children: React.ReactNode }) =>
    props.loading === true ? (
        <Skeleton>{props.children}</Skeleton>
    ) : (
        <>{props.children}</>
    );

export const LogLine = (props: LogLineProps) => {
    // TODO: The tab-width is dependent on styling. How do we make sure we don't change this?
    const leadingWhitespace = props.line.leading.spaces + props.line.leading.tabs * 8;
    const leadingEmSpace = `${leadingWhitespace * 0.6}em`;

    return (
        <Box sx={{ display: 'flex' }}>
            {props.enableShowLineContextButton && (
                <Box sx={{ whiteSpace: 'nowrap', pr: 2 }}>
                    <SkeletonWhenLoading loading={props.loading}>
                        <ButtonText
                            size='small'
                            buttonType='secondary'
                            sx={{ p: 0 }}
                            onClick={(event) =>
                                props.onClickShowLineContext(
                                    props.timestamp,
                                    props.labels,
                                    event
                                )
                            }
                        >
                            Show
                        </ButtonText>
                    </SkeletonWhenLoading>
                </Box>
            )}
            <Box className='log-line-timestamp' sx={{ whiteSpace: 'nowrap', pr: 2 }}>
                <SkeletonWhenLoading loading={props.loading}>
                    <span>{formatTimestamp(props.timestamp)}</span>
                </SkeletonWhenLoading>
            </Box>
            <Box className='log-line-microservice' sx={{ whiteSpace: 'nowrap', pr: 2 }}>
                <SkeletonWhenLoading loading={props.loading}>
                    <span>{props.labels.microservice}</span>
                </SkeletonWhenLoading>
            </Box>
            <Box
                sx={{ flexGrow: 1 }}
                style={
                    leadingWhitespace > 0
                        ? {
                              paddingLeft: leadingEmSpace,
                              textIndent: `-${leadingEmSpace}`,
                          }
                        : undefined
                }
            >
                {props.loading === true ? (
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                ) : (
                    props.line.sections.map((section, i) => (
                        <span key={i} /*style={coloredLineSectionCss(section)}*/>
                            {section.text}
                        </span>
                    ))
                )}
            </Box>
        </Box>
    );
};
