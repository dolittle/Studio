// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps, Typography } from '@mui/material';

import { StatusIndicator, StatusIndicatorProps } from '@dolittle/design-system';

const styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: { xs: 'center', sm: 'flex-start' },
    my: 1,
};

export type PageProps = {
    title: string;
    healthStatus?: StatusIndicatorProps['status'];
    healthStatusLabel?: StatusIndicatorProps['label'];
    healthStatusMessage?: StatusIndicatorProps['message'];
    children?: React.ReactNode;
    sx?: SxProps;
};

export const Page = ({ title, healthStatus, healthStatusLabel, healthStatusMessage, children, sx }: PageProps) =>
    <>
        <Box sx={{ ...styles, ...sx }}>
            <Typography variant='h1' sx={{ mr: healthStatus ? 3 : 0 }}>{title}</Typography>
            {healthStatus && <StatusIndicator status={healthStatus} label={healthStatusLabel} message={healthStatusMessage} variantFilled />}
        </Box>
        {children}
    </>;
