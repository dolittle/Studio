// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, CircularProgress, SxProps, Typography } from '@mui/material';

import { Icon, SvgIconsDefinition } from '@dolittle/design-system';

type ConnectionStatusCondition = {
    color: 'text.primary' | 'text.secondary' | 'success.main' | 'warning.main' | 'error.main' | 'info.main';
    icon: SvgIconsDefinition | null;
};

// const containerHealthStatus = (status: string) => {
//     if (status === 'waiting') {
//         return {
//             status: 'warning',
//             label: 'pending',
//         };
//     }

//     return status;
// };

const connectionStatusCondition = (status: string): ConnectionStatusCondition => {
    if (status === 'success') {
        return { color: 'success.main', icon: 'CheckCircleRounded' };
    } else if (status === 'table-success') {
        return { color: 'text.primary', icon: 'CheckCircleRounded' };
    } else if (status === 'waiting') {
        return { color: 'text.secondary', icon: null };
    } else if (status === 'warning') {
        return { color: 'warning.main', icon: 'WarningRounded' };
    } else if (status === 'error') {
        return { color: 'error.main', icon: 'ErrorRounded' };
    }

    return { color: 'text.secondary', icon: 'HelpRounded' };
};

/**
 * The props for a {@link StatusIndicator} component.
 */
export type StatusIndicatorProps = {
    /**
     * The `status` to show.
     */
    status: 'success' | 'table-success' | 'waiting' | 'warning' | 'error' | 'unknown';

    /**
     * The `label` to show.
     *
     * If not provided, the `status` will be used as the `label`.
     * @default status
     */
    label?: string;

    /**
     * Whether to show the status as a filled variant.
     * @default false
     */
    variantFilled?: boolean;

    /**
     * The `sx` prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;
};

/**
 * A component that shows a status or progress indicator.
 * @param {StatusIndicatorProps} props - The {@link StatusIndicatorProps}.
 * @returns A {@link StatusIndicator} component.
 */
export const StatusIndicator = ({ label, status, variantFilled, sx }: StatusIndicatorProps) => {
    const { color, icon } = connectionStatusCondition(status);

    const styles = {
        variantText: {
            color,
            display: 'inline-flex',
            alignItems: 'center',
            ...sx,
        },
        variantFilled: {
            minWidth: 64,
            minHeight: 36,
            py: 0.75,
            px: 2,
            color: 'background.paper',
            backgroundColor: color,
            borderRadius: '4px',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            ...sx,
        },
    };

    return (
        <Box sx={variantFilled ? styles.variantFilled : styles.variantText}>
            {icon && <Icon icon={icon} />}
            {status === 'waiting' && <CircularProgress color='inherit' size={16} />}
            <Typography variant='button' sx={{ ml: 1 }}>{label ?? status}</Typography>
        </Box>
    );
};
