// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps } from '@mui/material';

import { ContentDivider } from './ContentDivider';
import { ContentHeader, ContentHeaderProps } from './ContentHeader';

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
        <Box sx={{ ...{ py: noSpace ? 0 : 3 }, ...sx }}>
            {!hideHeader && <ContentHeader title={title} titleTextVariant='subtitle' {...headerProps} sx={{ mb: noSpace ? 0 : 2 }} />}
            {children}
        </Box>
    </>;
