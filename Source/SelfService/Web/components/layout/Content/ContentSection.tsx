// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps } from '@mui/material';

import { ContentDivider } from './ContentDivider';
import { ContentHeader, ContentHeaderProps } from './ContentHeader';

export type ContentSectionProps = {
    title?: string;
    hideHeader?: boolean;
    headerProps?: Partial<ContentHeaderProps>;
    children?: React.ReactNode;
    beforeHeaderSlot?: React.ReactNode;
    sx?: SxProps;
};

export const ContentSection = ({ title = '', hideHeader, headerProps, children, beforeHeaderSlot: beforeContentSlot, sx }: ContentSectionProps) =>
    <>
        <ContentDivider />
        {beforeContentSlot}
        <Box sx={{ ...{ my: 2 }, ...sx }}>
            {!hideHeader && <ContentHeader title={title} titleTextVariant='subtitle' {...headerProps} />}
            {children}
        </Box>
    </>;
