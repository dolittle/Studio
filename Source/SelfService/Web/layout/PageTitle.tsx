// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps, Typography } from '@mui/material';

import { StatusIndicator, StatusIndicatorProps } from '@dolittle/design-system';

const styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: { xs: 'center', sm: 'flex-start' },
    mb: 2.5,
};

const WithHealthStatus = ({ title, healthStatus, healthStatusLabel, healthStatusMessage, sx }: PageTitleProps) =>
    <Box component='header' sx={{ ...styles, ...sx }}>
        <Typography variant='h1' sx={{ mr: healthStatus ? 3 : 0 }}>{title}</Typography>
        {healthStatus && <StatusIndicator status={healthStatus} label={healthStatusLabel} message={healthStatusMessage} variantFilled />}
    </Box>;

/**
 * The props for a {@link PageTitleProps} component.
 */
export type PageTitleProps = {
    /**
     * The title of the page.
     */
    title: string;

    /**
     * The health status of the page.
     */
    healthStatus?: StatusIndicatorProps['status'];

    /**
     * The health status label of the page.
     */
    healthStatusLabel?: StatusIndicatorProps['label'];

    /**
     * The health status message of the page.
     */
    healthStatusMessage?: StatusIndicatorProps['message'];

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;
};

/**
 * The page title component is the header component that contains the title and optional status of the page.
 * @param {PageTitleProps} props - The {@link PageTitleProps}.
 * @returns A {@link PageTitle} component.
 */
export const PageTitle = ({ title, healthStatus, healthStatusLabel, healthStatusMessage, sx }: PageTitleProps) =>
    healthStatus
        ? <WithHealthStatus title={title} healthStatus={healthStatus} healthStatusLabel={healthStatusLabel} healthStatusMessage={healthStatusMessage} />
        : <Typography variant='h1' sx={{ mb: 4, ...sx }}>{title}</Typography>;
