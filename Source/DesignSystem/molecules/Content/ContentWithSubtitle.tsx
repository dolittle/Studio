// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps, Typography } from '@mui/material';

import { ContentDivider, Icon, InlineWrapper } from '../../index';

/**
 * The props for a {@link ContentWithSubtitle} component.
 */
export type ContentWithSubtitleProps = {
    /**
     * The title of the content.
     */
    title: string;

    /**
     * The label for the info tooltip.
     */
    infoTooltipLabel?: string;

    /**
     * The children of the content.
     */
    children: React.ReactNode;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;
};

/**
 * A sub-component article that renders a content with a header.
 * @param {ContentWithSubtitleProps} props - The {@link ContentWithSubtitleProps}.
 * @returns A {@link ContentWithSubtitle} component.
 */
export const ContentWithSubtitle = ({ title, infoTooltipLabel, children, sx }: ContentWithSubtitleProps) =>
    <Box component='article' sx={{ my: 3, ...sx }}>
        <ContentDivider />

        <InlineWrapper sx={{ my: 3 }}>
            <Typography variant='subtitle2'>{title}</Typography>
            {infoTooltipLabel && <Icon icon='InfoRounded' tooltipLabel={infoTooltipLabel} />}
        </InlineWrapper>

        {children}
    </Box>;
