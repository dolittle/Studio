// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';
import { Vega } from 'react-vega';

import { Box, Paper, Stack, SxProps, Theme, Typography } from '@mui/material';

import { DataSet, Legend } from '../../atoms/Metrics';
import { useThemedSpec } from './theming';

/**
 * The props for a {@link Graph} component.
 */
export type GraphProps = {
    title: string;
    subtitle?: string;
    data: DataSet[];
    height?: number;
    sx?: SxProps<Theme>;
};

/**
 * A graph (line-plot) of a dataset.
 * @param props The {@link GraphProps} for the component instance.
 * @returns The rendered {@link JSX.Element}.
 */
export const Graph = (props: GraphProps) => {
    const [spec, vegaRef] = useThemedSpec({
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
                    strokeWidth: 2,
                    strokeCap: 'round',
                    strokeDash: [2, 4],
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

    const table = useMemo(() =>
        props.data.flatMap((dataset, index) => dataset.values.map(datapoint => ({ ...datapoint, index })))
        , [props.data]);

    return (
        <Paper elevation={1} sx={{ pt: 2, pr: 6, pb: 3, pl: 8, ...props.sx }}>
            <Stack direction='row' justifyContent='space-between' sx={{ mb: 3 }}>
                <Box>
                    <Typography variant='subtitle1'>{props.title}</Typography>
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
