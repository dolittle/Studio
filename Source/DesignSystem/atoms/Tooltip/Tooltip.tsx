// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ReactElement } from 'react';

import { Tooltip as MuiTooltip, Paper, Typography } from '@mui/material';

type TooltipProps = {
    id: string;
    disableHoverListener?: boolean;
    placement?: 'top' | 'right' | 'bottom' | 'left';
    title: React.ReactNode;
    tooltipTitle: string;
    tooltipText: string;
    children: ReactElement<any, any>;
};

export const Tooltip = ({ id, tooltipTitle, tooltipText, children }: TooltipProps) =>
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
