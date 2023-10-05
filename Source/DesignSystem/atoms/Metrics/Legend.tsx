// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps, Theme, Typography } from '@mui/material';

import { useThemeColorScheme } from './colors';
import { DataSet } from './data';
import { LegendLine } from './LegendLine';

/**
 * The props for a {@link Legend} component.
 */
export type LegendProps = {
    data: DataSet[];
    sx?: SxProps<Theme>;
};

/**
 * A legend that displays a preview and description of datasets in a graph.
 * @param props The {@link LegendProps} for the component instance.
 * @returns The rendered {@link JSX.Element}.
 */
export const Legend = (props: LegendProps) => {
    const colorScheme = useThemeColorScheme();

    return (
        <Box component='table' sx={props.sx}>
            <tbody>
                {props.data.map((dataset, index) => (
                    <tr key={index}>
                        <Box component='td' sx={{ textAlign: 'right' }}>
                            <Typography variant='body2' sx={{ textTransform: 'uppercase' }}>{dataset.group}</Typography>
                        </Box>
                        <td>
                            <LegendLine color={colorScheme[index]} name='Average' dashed />
                        </td>
                        <td>
                            <LegendLine color={colorScheme[index]} name={dataset.name} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </Box>
    );
};
