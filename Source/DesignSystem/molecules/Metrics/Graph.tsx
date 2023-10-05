// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useMemo } from 'react';
import { Vega } from 'react-vega';

import { Box, Paper, Stack, SxProps, Theme, Typography } from '@mui/material';

import { DataSet, Legend } from '../../atoms/Metrics';
import { useThemedSpec } from './theming';

/**
 * The props for a {@link Graph} component.
 */
export type GraphProps = {
    /**
     * The title of the plot.
     */
    title: string;
    /**
     * An optional subtitle to display below the title of the plot.
     */
    subtitle?: string;
    /**
     * An optional unit to display next to the title of the plot.
     */
    unit?: string;
    /**
     * The datasets to use for the plot.
     */
    data: DataSet[];
    /**
     * An optional domain (time) to use for the horisontal axis. Defaults to the domain of the datasets.
     */
    domain?: [number, number];
    /**
     * An optional range (values) to use for the vertical axis. Defaults to the range of the datasets.
     */
    range?: [number, number];
    /**
     * An optional height to use for the plot. Defaults to 200px.
     */
    height?: number;
    /**
     * Optional MUI sx-styling to apply to the Paper container of the plot.
     */
    sx?: SxProps<Theme>;
};

/**
 * A graph (line-plot) of a dataset.
 * @param props The {@link GraphProps} for the component instance.
 * @returns The rendered {@link JSX.Element}.
 */
export const Graph = (props: GraphProps) => {
    const [spec, vegaRef, setParams] = useThemedSpec(
        {
            width: 'container',
            height: 'container',
            autosize: {
                contains: 'content',
                type: 'pad',
            },
            padding: 0,
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
                        clip: true,
                        line: true,
                        strokeWidth: 2,
                        strokeJoin: 'round',
                        fillOpacity: 0.2,
                    },
                    encoding: {
                        x: {
                            field: 'time',
                            type: 'temporal',
                            scale: {
                                type: 'time',
                                domain: { expr: 'calculated_domain' }
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
                            scale: {
                                domain: { expr: 'calculated_range' }
                            }
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
                        clip: true,
                        strokeWidth: 2,
                        strokeCap: 'round',
                        strokeDash: [2, 4],
                    },
                    encoding: {
                        y: {
                            field: 'value',
                            aggregate: 'mean',
                            scale: {
                                domain: { expr: 'calculated_range' }
                            }
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
            transform: [
                {
                    filter: {
                        field: 'time',
                        range: { signal: 'filter_domain' },
                    }
                }
            ],
        },
        [
            {
                name: 'domain',
                value: props.domain ?? null,
            },
            {
                name: 'range',
                value: props.range ?? null,
            },
            {
                name: 'filter_domain',
                expr: 'domain == null ? [MIN_VALUE, MAX_VALUE] : domain'
            },
            {
                name: 'calculated_domain',
                expr: 'domain == null ? extent(pluck(data("table"),"time")) : domain',
            },
            {
                name: 'calculated_range',
                expr: 'range == null ? extent(pluck(data("table"),"value")) : range',
            },
        ]);

    useEffect(() => {
        setParams([
            {
                name: 'domain',
                value: props.domain ?? null,
            },
            {
                name: 'range',
                value: props.range ?? null,
            },
        ]);
    }, [setParams, props.domain, props.range]);

    const table = useMemo(() =>
        props.data.flatMap((dataset, index) => dataset.values.map(datapoint => ({ ...datapoint, index })))
        , [props.data]);

    return (
        <Paper elevation={1} sx={{ pt: 2, pr: 6, pb: 3, pl: 8, ...props.sx }}>
            <Stack direction='row' justifyContent='space-between' sx={{ mb: 3 }}>
                <Box>
                    <Typography variant='subtitle1'>{props.title}{props.unit !== undefined && ` - ${props.unit}`}</Typography>
                    {props.subtitle && <Typography variant='subtitle2' color='text.disabled'>{props.subtitle}</Typography>}
                </Box>
                <Legend data={props.data} />
            </Stack>
            <Vega
                mode='vega-lite'
                spec={spec}
                actions={false}
                height={props.height ?? 200}
                style={{ width: '100%', direction: 'rtl' }}
                ref={vegaRef}
                data={{ table }}
            />
        </Paper>
    );
};
