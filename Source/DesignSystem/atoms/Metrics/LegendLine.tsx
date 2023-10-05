// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Typography, SxProps, Theme } from '@mui/material';

/**
 * The props for a {@link LegendLine} component.
 */
export type LegendLineProps = {
    name: string;
    color: string;
    width?: number;
    dashed?: boolean;
    sx?: SxProps<Theme>;
};

/**
 * A preview of a line in a graph to use in legends.
 * @param props The {@link LegendLineProps} for the component instance.
 * @returns The rendered {@link JSX.Element}.
 */
export const LegendLine = (props: LegendLineProps) => {
    const width = props.width ?? 2;
    const dashArray = props.dashed === true ? '1,4' : 'none';

    return (
        <Typography variant='body2' sx={props.sx}>
            <Box
                component='svg'
                viewBox='0 0 36 10'
                preserveAspectRatio='none'
                sx={{
                    lineHeight: 1,
                    height: '1em',
                    width: '3.6em',
                    verticalAlign: 'middle',
                }}
            >
                <Box
                    component='line'
                    x1='10' x2='26'
                    y1='5' y2='5'
                    sx={{
                        color: props.color,
                        stroke: 'currentcolor',
                        strokeWidth: width,
                        strokeDasharray: dashArray,
                        strokeLinecap: 'round',
                    }}
                />
            </Box>
            {props.name}
        </Typography>
    );
};
