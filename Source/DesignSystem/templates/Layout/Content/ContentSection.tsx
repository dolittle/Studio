// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps } from '@mui/material';

import { ContentDivider, ContentHeader, ContentHeaderProps } from '@dolittle/design-system';

export type ContentSectionProps = {
    title?: string;
    hideHeader?: boolean;
    hideDivider?: boolean;
    headerProps?: Partial<ContentHeaderProps>;
    children?: React.ReactNode;
    beforeHeaderSlot?: React.ReactNode;
    noSpace?: boolean;
    sx?: SxProps;
};

export const ContentSection = ({ title = '', hideDivider, hideHeader, headerProps, children, beforeHeaderSlot, noSpace = false, sx }: ContentSectionProps) =>
    <>
        {!hideDivider && <ContentDivider />}
        {beforeHeaderSlot}
        <Box sx={{ ...{ my: noSpace ? 0 : 3 }, ...sx }}>
            {!hideHeader && <ContentHeader title={title} titleTextVariant='subtitle' {...headerProps} sx={{ mb: noSpace ? 0 : 2 }} />}
            {children}
        </Box>
    </>;
