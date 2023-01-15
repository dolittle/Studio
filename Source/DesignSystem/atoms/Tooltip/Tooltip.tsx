// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ReactElement } from 'react';

import { Tooltip as MuiTooltip, Paper, Typography } from '@mui/material';

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
    tooltipText: string | undefined;

    /**
     * Don't activate the tooltip on hover.
     * @default false
     */
    disableHoverListener?: boolean;

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
            <Paper sx={{ py: 1, px: 2 }}>
                <Typography variant='body2' sx={{ fontWeight: 700 }}>{tooltipTitle}</Typography>
                <Typography variant='body2'>{tooltipText}</Typography>
            </Paper>
        }
    >
        {children}
    </MuiTooltip>;
