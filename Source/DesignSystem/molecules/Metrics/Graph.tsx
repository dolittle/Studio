// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';
import { Vega } from 'react-vega';

import { useTheme, Grid, Paper, SxProps, Theme, Typography } from '@mui/material';

import { useThemedSpec } from './theming';

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
    const [spec, vegaRef] = useThemedSpec({
        width: 'container',
        height: 'container',
        background: '#0000',
        config: {
            legend: {
                disable: true,
            },
            axis: {
                title: null,
                labelColor: { expr: 'theme.palette.text.secondary' },
                gridColor: { expr: 'theme.palette.outlineborder' },
                domainColor: { expr: 'theme.palette.outlineborder' },
                tickColor: { expr: 'theme.palette.outlineborder' },
                ticks: false,
                labelFont: { expr: 'theme.typography.body2.fontFamily' },
                labelFontSize: { expr: 'theme.typography.body2.fontSize' },
                labelFontWeight: { expr: 'theme.typography.body2.fontWeight' },
                labelPadding: { expr: 'theme.spacing * 2' },
            },
            view: {
                stroke: { expr: 'theme.palette.outlineborder' },
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
                            scheme: { expr: 'colorscheme' },
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
                            scheme: { expr: 'colorscheme' },
                        }
                    },
                }
            }
        ],
        data: { name: 'table' },
    });

    const theme = useTheme();

    const table = useMemo(() =>
        props.data.flatMap((dataset, index) => dataset.values.map(datapoint => ({ ...datapoint, index })))
        , [props.data]);

    return (
        <Paper elevation={1} sx={{ p: 2, ...props.sx }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant='subtitle1'>{props.title}</Typography>
                    {props.subtitle && <Typography variant='subtitle2' color='text.disabled'>{props.subtitle}</Typography>}
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
                                            <line x1='0' y1='5' x2='10' y2='5' stroke={theme.palette[n % 2 === 0 ? 'primary' : 'secondary'].dark} strokeWidth='2' strokeDasharray='1,1' />
                                        </svg>
                                        Average since last restart
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant='body2'>
                                        <svg viewBox='0 0 10 10' preserveAspectRatio='none' style={{ lineHeight: 1, height: '1em', width: '2.6em', verticalAlign: 'middle', margin: '0 1em' }}>
                                            <line x1='0' y1='5' x2='10' y2='5' stroke={theme.palette[n % 2 === 0 ? 'primary' : 'secondary'].dark} strokeWidth='2' />
                                        </svg>
                                        {dataset.name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        ))
                    }
                </Grid>
                <Grid item xs={12} sx={{ height: 200 }}>
                    <Vega
                        mode='vega-lite'
                        spec={spec}
                        actions={false}
                        style={{ height: '100%', width: '100%' }}
                        ref={vegaRef}
                        data={{ table }}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};
