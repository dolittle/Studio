// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Skeleton } from '@mui/material';

import { Button } from '@dolittle/design-system';

import { format } from 'date-fns';

import { ColoredLine, ColoredLineSection, TerminalColor } from './lineParsing';
import { DataLabels } from './loki/types';

const styles = {
    showCell: {
        display: 'flex',
        whiteSpace: 'nowrap',
        pr: 2,
        flexShrink: 0
    },
    timestampCell: {
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        pr: 2,
        flexShrink: 0,
    },
    microserviceCell: {
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        pr: 2,
        minWidth: 96,
        flexShrink: 0,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    textCell: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        wordWrap: 'break-word',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
    },
};

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
    showContextButton?: boolean;
    onClickShowLineContext?: (
        timestamp: bigint,
        labels: DataLabels,
        event: React.MouseEvent<HTMLElement, MouseEvent>
    ) => void;
};

type SkeletonWhenLoadingProps = {
    loading?: boolean;
    children: React.ReactNode;
};

export const formatTimestamp = (timestamp: bigint): string => {
    const date = new Date(Number(timestamp / 1_000_000n));
    return format(date, 'yyyy-MM-dd HH:mm:ss');
};

const SkeletonWhenLoading = ({ loading, children }: SkeletonWhenLoadingProps) =>
    loading === true ? <Skeleton>{children}</Skeleton> : <>{children}</>;

export const LogLine = ({ line, showContextButton, loading, onClickShowLineContext, timestamp, labels }: LogLineProps) => {
    // TODO: The tab-width is dependent on styling. How do we make sure we don't change this?
    const leadingWhitespace = line.leading.spaces + line.leading.tabs * 8;
    const leadingEmSpace = `${leadingWhitespace * 0.6}em`;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            {showContextButton === true && (
                <Box sx={styles.showCell}>
                    <SkeletonWhenLoading loading={loading}>
                        <Button
                            label='Show'
                            color='subtle'
                            component='span'
                            role='none'
                            sx={{ p: 0, height: 36 }}
                            onClick={event => onClickShowLineContext?.(timestamp, labels, event)}
                        />
                    </SkeletonWhenLoading>
                </Box>
            )}

            <Box className='log-line-timestamp' sx={styles.timestampCell}>
                <SkeletonWhenLoading loading={loading}>
                    <span>[{formatTimestamp(timestamp)}]</span>
                </SkeletonWhenLoading>
            </Box>

            <Box className='log-line-microservice' sx={styles.microserviceCell} title={labels.microservice}>
                <SkeletonWhenLoading loading={loading}>
                    <span>{labels.microservice}</span>
                </SkeletonWhenLoading>
            </Box>

            <Box sx={styles.textCell}
                style={
                    leadingWhitespace > 0 ? {
                        paddingLeft: leadingEmSpace,
                        textIndent: `-${leadingEmSpace}`
                    } : undefined
                }
            >
                {loading === true ? (
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                ) : (
                    line.sections.map((section, i) => (
                        <span key={i} /*style={coloredLineSectionCss(section)}*/>
                            {section.text}
                        </span>
                    ))
                )}
            </Box>
        </Box>
    );
};
