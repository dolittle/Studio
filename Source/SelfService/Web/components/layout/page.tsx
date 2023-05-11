// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps, Typography } from '@mui/material';

import { StatusIndicator, StatusIndicatorProps } from '@dolittle/design-system';

import { usePageTitle } from '../../utils/usePageTitle';

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
    children?: React.ReactNode;
    sx?: SxProps;
};

export const Page = ({ title, healthStatus, healthStatusLabel, children, sx }: PageProps) => {
    usePageTitle(title);

    return (
        <>
            <Box sx={{ ...styles, ...sx }}>
                <Typography variant='h1' sx={{ mr: healthStatus ? 3 : 0 }}>{title}</Typography>
                {healthStatus && <StatusIndicator status={healthStatus} label={healthStatusLabel} variantFilled />}
            </Box>
            {children}
        </>
    );
};
