// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, CircularProgress, Typography } from '@mui/material';

import { Icon } from '@dolittle/design-system';

import { connectionStatusCondition } from './helpers';

/**
 * The props for a {@link StatusIndicator} component.
 */
export type StatusIndicatorProps = {
    /**
     * The status to show.
     */
    status: 'running' | 'connected' | 'pending' | 'waiting' | 'failed' | 'unknown';

    /**
     * The label to show.
     *
     * If not provided, the status will be used as the label.
     * @default status
     */
    label?: string;

    /**
     * Whether to show the status as a filled variant.
     * @default false
     */
    filledVariant?: boolean;
};

/**
 * A component that shows a status or progress indicator.
 * @param {StatusIndicatorProps} props - The {@link StatusIndicatorProps}.
 * @returns A {@link StatusIndicator} component.
 */
export const StatusIndicator = ({ label, status, filledVariant }: StatusIndicatorProps) => {
    const { color, icon } = connectionStatusCondition(status.toLowerCase());

    const styles = {
        variantText: {
            color: color === 'subtle' ? 'text.secondary' : color,
            display: 'inline-flex',
            alignItems: 'center',
        },
        variantFilled: {
            minWidth: 64,
            py: 0.75,
            px: 2,
            color: 'background.paper',
            backgroundColor: color === 'subtle' ? 'text.secondary' : color,
            borderRadius: '4px',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    };

    return (
        <Box sx={filledVariant ? styles.variantFilled : styles.variantText}>
            {icon && <Icon icon={icon} />}
            {status === 'waiting' && <CircularProgress color='inherit' size={15} />}
            <Typography variant='button' sx={{ ml: 1.5 }}>{label ?? status}</Typography>
        </Box>
    );
};
