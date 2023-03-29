// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps, Typography } from '@mui/material';

import { StatusIndicator } from '@dolittle/design-system';

import { usePageTitle } from '../../utils/usePageTitle';

export type PageProps = {
    title: string;
    healthStatus?: string;
    children?: React.ReactNode;
    sx?: SxProps;
};

export const Page = ({ title, healthStatus, children, sx }: PageProps) => {
    usePageTitle(title);

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', my: 1, ...sx }}>
                <Typography variant='h1' sx={{ mr: healthStatus ? 3 : 0 }}>{title}</Typography>
                {healthStatus && <StatusIndicator status={healthStatus} variantFilled />}
            </Box>
            {children}
        </>
    );
};
