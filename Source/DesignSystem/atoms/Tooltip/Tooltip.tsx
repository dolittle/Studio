// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Tooltip as MuiTooltip, Typography } from '@mui/material';

/**
 * The props for a {@link Tooltip} component.
 */
export type TooltipProps = {
    /**
     * The title to show.
     */
    title: string;

    /**
     * The placement of the tooltip.
     * @default 'right'
     */
    placement?: 'top' | 'right';

    /**
     * The children to show the tooltip for.
     */
    children: React.ReactElement<any, any>;
};

/**
 * The tooltip component is used to show a tooltip when hovering over an element.
 * @param {TooltipProps} props - The {@link TooltipProps}.
 * @returns A {@link Tooltip} component.
 */
export const Tooltip = ({ title, placement, children }: TooltipProps) =>
    <MuiTooltip
        title={<Typography variant='body2'>{title}</Typography>}
        placement={placement ?? 'right'}
        arrow
    >
        {children}
    </MuiTooltip>;
