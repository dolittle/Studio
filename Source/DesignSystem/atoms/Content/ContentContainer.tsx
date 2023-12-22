// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Paper, SxProps } from '@mui/material';

/**
 * The props for a {@link ContentContainer} component.
 */
export type ContentContainerProps = {
    /**
     * The content of the component.
     */
    children: React.ReactNode;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;
};

/**
 * The ContentContainer is used to wrap sections of content with a paper background.
 *
 * Usually used to wrap a {@link ContentWithSubtitle} components.
 * @param {ContentContainerProps} props - The {@link ContentContainerProps}.
 * @returns A {@link ContentContainer} component.
 */
export const ContentContainer = ({ sx, children }: ContentContainerProps) =>
    <Paper component='article' sx={{ width: 1, my: 2, py: 2, px: 3, maxWidth: '1200px', ...sx }}>
        {children}
    </Paper>;
