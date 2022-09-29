// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useMemo, useRef } from 'react';
import { createClassFromSpec, Vega, VisualizationSpec } from 'react-vega';
import { timeFormatLocale, TimeInterval } from 'vega';

import { Grid, Paper, Typography } from '@mui/material';
import { useTheme, SxProps, Theme } from '@mui/material/styles';

const spec: VisualizationSpec = {
        width: 'container',
        height: 'container',
        background: '#0000',
        config: {
            legend: {
                disable: true,
            },
            axis: {
                title: null,
                labelColor: { expr: 'themeTextColor("secondary")' },
                gridColor: '#504D4D',
                domainColor: '#504D4D',
                tickColor: '#504D4D',
                ticks: false,
                labelFont: { expr: 'themeFont("body2")' },
                labelFontSize: { expr: 'themeFontSize("body2")' },
                labelFontWeight: { expr: 'themeFontWeight("body2")' },
                labelPadding: { expr: 'themeSpacing(2)' },
            },
            view: {
                stroke: '#504D4D',
            }
        },
        layer: [
            {
                mark: {
                    type: 'area',
                    line: true,
                    fillOpacity: 0.2,
                },
                encoding: {
                    x: {
                        field: 'time',
                        type: 'temporal',
                        scale: {
                            type: 'time',
                        },
                        axis: {
                            labelExpr: `
                                hours(datum.value) == 0
                                    ? timeFormat(datum.value, '%b %-d')
                                    : timeFormat(datum.value, '%H:%M')
                            `,
                        },
                    },
                    y: {
                        field: 'value',
                        type: 'quantitative',
                        stack: false,
                    },
                    color: {
                        field: 'index',
                        type: 'nominal',
                        scale: {
                            range: [
                                { expr: 'themeColor("primary")' },
                                { expr: 'themeColor("secondary")' },
                            ]
                        }
                    },
                },
            },
            {
                mark: {
                    type: 'rule',
                    strokeDash: [4, 4],
                },
                encoding: {
                    y: {
                        field: 'value',
                        aggregate: 'mean',
                    },
                    color: {
                        field: 'index',
                        type: 'nominal',
                        scale: {
                            range: [
                                { expr: 'themeColor("primary")' },
                                { expr: 'themeColor("secondary")' },
                            ]
                        }
                    },
                }
            }
        ],
        data: { name: 'table' },
    };

type DataPoint = { time: number, value: number };

export type DataSet = {
    group: string;
    name: string;
    values: DataPoint[];
};

export type GraphProps = {
    title: string;
    subtitle?: string;
    data: DataSet[];
    sx?: SxProps<Theme>;
};

export const Graph = (props: GraphProps) => {
    const table = useMemo(() =>
        props.data.flatMap((dataset, index) => dataset.values.map(datapoint => ({ ...datapoint, index })))
    , [props.data]);

    const theme = useTheme();

    const functions = useMemo(() => ({
        themeFont: (variant: string) => {
            if (variant in theme.typography) {
                return theme.typography[variant].fontFamily;
            }
            return theme.typography.fontFamily;
        },
        themeFontSize: (variant: string) => {
            if (variant in theme.typography) {
                return fontSizeToPixels(theme.typography[variant].fontSize, theme.typography.htmlFontSize);
            }
            return fontSizeToPixels(theme.typography.fontSize, theme.typography.htmlFontSize);
        },
        themeFontWeight: (variant: string) => {
            if (variant in theme.typography) {
                return theme.typography[variant].fontWeight;
            }
            return theme.typography.fontWeightRegular;
        },
        themeColor: (variant: string) => {
            let color = theme.palette.primary;
            if (variant in theme.palette) {
                color = theme.palette[variant];
            }

            if (theme.palette.mode in color) {
                return color[theme.palette.mode];
            }

            return color.main;
        },
        themeTextColor: (variant: string) => {
            if (variant in theme.palette.text) {
                return theme.palette.text[variant];
            }

            return theme.palette.text.primary;
        },
        themeSpacing: (amount: number) => {
            return parseFloat(theme.spacing(amount));
        },
    }), [theme]);

    return (
        <Paper elevation={1} sx={{ p: 2, ...props.sx }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant='subtitle1'>{props.title}</Typography>
                    { props.subtitle && <Typography variant='subtitle2' color='text.disabled'>{props.subtitle}</Typography> }
                </Grid>
                <Grid item xs={6}>
                    {
                        props.data.map((dataset, n) => (
                            <Grid container key={n} sx={{ textAlign: 'right' }}>
                                <Grid item xs={4} >
                                    <Typography variant='body2' sx={{ textTransform: 'uppercase' }}>{dataset.group}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant='body2'>
                                        <svg viewBox='0 0 10 10' preserveAspectRatio='none' style={{ lineHeight: 1, height: '1em', width: '2.6em', verticalAlign: 'middle', margin: '0 1em' }}>
                                            <line x1='0' y1='5' x2='10' y2='5' stroke={theme.palette[n % 2 === 0 ? 'primary' : 'secondary'].dark } strokeWidth='2' strokeDasharray='1,1' />
                                        </svg>
                                        Average since last restart
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant='body2'>
                                        <svg viewBox='0 0 10 10' preserveAspectRatio='none' style={{ lineHeight: 1, height: '1em', width: '2.6em', verticalAlign: 'middle', margin: '0 1em' }}>
                                            <line x1='0' y1='5' x2='10' y2='5' stroke={theme.palette[n % 2 === 0 ? 'primary' : 'secondary'].dark } strokeWidth='2' />
                                        </svg>
                                        {dataset.name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        ))
                    }
                </Grid>
                <Grid item xs={12}  sx={{ height: 200 }}>
                    <Vega
                        mode='vega'
                        spec={spec}
                        actions={false}
                        style={{ height: '100%', width: '100%' }}
                        data={{ table }}
                        expressionFunctions={functions}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

const fontSizeToPixels = (size: string | number, rem: number): number => {
    if (typeof size === 'number') {
        return size;
    }

    if (size.endsWith('px')) {
        return parseFloat(size);
    }

    if (size.endsWith('rem')) {
        return rem * parseFloat(size);
    }

    console.warn('Unsupported Font-Size specified for graph - will default to REM');
    return rem;
};
