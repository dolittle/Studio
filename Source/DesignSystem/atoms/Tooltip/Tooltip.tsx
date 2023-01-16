// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ReactElement } from 'react';

import { Tooltip as MuiTooltip, Paper, Typography } from '@mui/material';

/**
 * The props for a {@link Tooltip} component.
 */
type TooltipProps = {
    /**
     * Required. Unique id to add every tooltip.
     */
    id: string;

    /**
     * Required. The content title.
     */
    tooltipTitle: string | undefined;

    /**
     * Required. The content text.
     */
    tooltipText: string | React.ReactNode | undefined;

    /**
     * Don't activate the tooltip on hover. This is used to activate the tooltip on focus.
     *
     * Set to true.
     * @default true
     * @type {never}
     */
    disableHoverListener?: never;

    /**
     * The placement of the tooltip.
     *
     * Set to 'right'.
     * @default 'right'
     * @type {never}
     */
    placement?: never;

    /**
     * Required. The content to wrap with the tooltip.
     */
    children: ReactElement<any, any>;
};

/**
 * A Tooltip component.
 * @param {...TooltipProps} props - The {@link TooltipProps}.
 * @returns {ReactElement} A new {@link Tooltip} component.
 */
export const Tooltip = ({ id, tooltipTitle, tooltipText, children }: TooltipProps): ReactElement =>
    <MuiTooltip
        id={`${id}-tooltip`}
        disableHoverListener
        placement='right'
        title={
            <Paper sx={{ py: 1, px: 2, typography: 'body2' }}>
                <Typography sx={{ fontWeight: 700 }}>{tooltipTitle}</Typography>
                {tooltipText}
            </Paper>
        }
    >
        {children}
    </MuiTooltip>;
